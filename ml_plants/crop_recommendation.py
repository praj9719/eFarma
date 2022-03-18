import pickle

class CR:
    def __init__(self, pkl_file):
        self.model = pickle.load(open(pkl_file, 'rb'))

    def predict(self, request):
        N = float(request.form.get('N'))
        P = float(request.form.get('P'))
        K = float(request.form.get('K'))
        PH = float(request.form.get('PH'))
        tempratue = float(request.form.get('temprature'))
        humidity = float(request.form.get('humidity'))
        rainfall = float(request.form.get('rainfall'))
        # print(N, P, K, PH, tempratue, humidity, rainfall)
        prediction = self.model.predict([[N, P, K, tempratue, humidity, PH, rainfall]])
        return prediction[0]