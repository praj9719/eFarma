import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Ruff from './components/Ruff';
import PlantView from './components/Plants/PlantView';
import DiseasePrediction from './components/LeafDisease/DiseasePrediction';
import CropRecommendation from './components/CropRecommendation/CropRecommendation';

function App() {
  return (
    <Router>
      <div className="App">
      {/* <img className="bgimg" src="https://images.pexels.com/photos/586744/pexels-photo-586744.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="img"/> */}
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/plants" exact component={Home} />
          <Route path="/plants/:plantId" exact component={PlantView} />
          <Route path="/plants/:plantId/:disease" exact component={Home} />
          <Route path="/leaf_disease_detection/:plant" component={DiseasePrediction} />
          <Route path="/crop_recommendation" exact component={CropRecommendation} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
