import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LandingPage from './Component/LandingPage/LandingPage.jsx';
import ProductCRUD from './Component/ProductCRUD/ProductCRUD';


const App = () => {
  
  return (
    <BrowserRouter >
      <div className="App">
        <Switch >
          <Route exact path='/'>
            <ProductCRUD />
          </Route>
        </Switch>      
      </div>
    </BrowserRouter>
  );
}

export default App;