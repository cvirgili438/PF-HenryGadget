
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './Component/LandingPage/LandingPage.jsx';
import Products from './Component/Products/Products.jsx';

function App() {
  return (
    <BrowserRouter >
    <div className="App">
      <Switch >
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/test'>
          <Products />
        </Route>
      </Switch>      
    </div>
    </BrowserRouter>
  );
}

export default App;
