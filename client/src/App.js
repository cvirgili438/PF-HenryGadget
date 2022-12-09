import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './Component/LandingPage/LandingPage.jsx';
import NavBar from './Component/NavBar/NavBar';
import Detail from './Component/Detail/Detail';
import CreateProduct from './Component/CreateProduct/CreateProduct';
import ProductCRUD from './Component/ProductCRUD/ProductCRUD';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditProduct from './Component/EditProduct/EditProduct';
import Cart from './Component/Cart/Cart.jsx';

const App = () => {
  
  return (
    <BrowserRouter >
      <div className="App">
        <Switch >
          <Route  path='/'>
            <NavBar/>
            <Route exact path={'/'}>
              <LandingPage /> 
            </Route>
            <Route path={'/Cart'}>
              <Cart />
            </Route>
            
          </Route>
        </Switch>  
        <Route exact path={'/Create/Product'}>
              <CreateProduct /> 
        </Route>   
        <Route exact path={'/test'}>
              <ProductCRUD /> 
        </Route> 

        <Route exact path={'/edit/:id'}>
          <EditProduct /> 
        </Route> 

        <Route exact path="/product/:id" component={Detail} />
      </div>
    </BrowserRouter>
  );
}

export default App;