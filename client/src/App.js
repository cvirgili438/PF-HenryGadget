import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LandingPage from './Component/LandingPage/LandingPage.jsx';


const App = () => {
  
  return (
    <BrowserRouter >
      <div className="App">
        <Switch >
          <Route exact path='/'>
            <LandingPage />
          </Route>
        </Switch>      
      </div>
    </BrowserRouter>
  );
}

export default App;