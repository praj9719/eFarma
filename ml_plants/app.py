from flask import Flask, request
from flask_cors import CORS
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('eFarma')
logger.info('Efarma init')

from leaf_disease_detection import LDD
from crop_recommendation import CR

tomato_model = LDD('models/tomatoleaf')
potato_model = LDD('models/potato')
corn_model = LDD('models/corn')
crmodel = CR('crop_recommendation/crop_recommendation.pkl')

app = Flask(__name__)
CORS(app, expose_headers='Authorization')

@app.route('/ldd_tomato', methods=['POST'])
def lddTomato():
    return {"result" : tomato_model.predict(request)}

@app.route('/ldd_potato', methods=['POST'])
def lddPotato():
    return {"result" : potato_model.predict(request)}

@app.route('/ldd_corn', methods=['POST'])
def lddCorn():
    return {"result" : corn_model.predict(request)}

@app.route('/croprec', methods=['POST'])
def cropRecommendation():
    return {"result" : crmodel.predict(request)}

if __name__ == "__main__":
    app.run(port=3001)