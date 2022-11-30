
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './Component/LandingPage/LandingPage.jsx';
import Product from './Component/Product/Product.jsx';

function App() {
  return (
    <BrowserRouter >
    <div className="App">
      <Switch >
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/test'>
          <Product />
        </Route>
      </Switch>      
    </div>
    </BrowserRouter>
  );
}

export default App;
