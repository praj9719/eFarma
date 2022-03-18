import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

import cv2
import pickle
import numpy as np
from keras.models import model_from_json

import warnings
warnings.filterwarnings("ignore")

img_len = 128
from keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
datagen = ImageDataGenerator(rescale=1./255, shear_range=0.2, zoom_range=0.2, horizontal_flip=True, validation_split=0.2)

def get_img(request):
    filestr = request.files['file'].read()
    npimg = np.fromstring(filestr, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
    cv2.imwrite('img.jpg', img)

    img = load_img('img.jpg', target_size=(img_len, img_len))
    img = img_to_array(img)
    img = img.reshape((1, img.shape[0], img.shape[1], img.shape[2]))
    img = datagen.flow(img)
    return img

class LDD:
    def __init__(self, root_dir):
        self.__load_model__(root_dir)

    def __load_model__(self, root_dir):
        lbl_tfm = pickle.load(open(root_dir + '/labels.pkl', 'rb'))
        self.classes = lbl_tfm.classes_
        json_file = open(root_dir+'/model.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        self.loaded_model = model_from_json(loaded_model_json)
        self.loaded_model.load_weights(root_dir+"/model.h5")

    def predict(self, request):
        img = get_img(request)
        result = {'classes' : [], 'prediction' : [], 'order' : [], 'status' : 0}
        try:
            pre = self.loaded_model.predict(img)
            order = np.array(pre).argsort()[0][::-1]
            result['status'] = 1
            result['classes'] = self.classes.tolist()
            result['prediction'] = pre[0].tolist()
            result['order'] = order.tolist()
        except Exception as e:
            print(e)
        return result