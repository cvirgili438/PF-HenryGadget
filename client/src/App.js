import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './Component/NavBar/NavBar.jsx';
import LandingPage from './Component/LandingPage/LandingPage.jsx';
import Detail from './Component/Detail/Detail';
import Footer from './Component/Footer/Footer.jsx';
import Page404 from './Component/Page404/Page404';
import CartPage from './Component/CartPage/CartPage';
import DashboardAdmin from './Component/Admin/DashboardAdmin/DashboardAdmin';
import ProductCRUD from './Component/Admin/ProductCRUD/ProductCRUD.jsx';
import OrderCRUD from './Component/Admin/OrderCRUD/OrderCRUD.jsx';
import MailingCRUD from './Component/Admin/MailingCRUD/MailingCRUD.jsx';
import ReviewCRUD from './Component/Admin/ReviewCRUD/ReviewCRUD.jsx';
import LocationCRUD from './Component/Admin/LocationCRUD/LocationCRUD.jsx';
import UserCRUD from './Component/Admin/UserCRUD/UserCRUD.jsx';
import CreateProduct from './Component/CreateProduct/CreateProduct.jsx'
import Checkout from './Component/Checkout/Checkout';
import Steppers from './Component/Checkout/Stepper';
import Payment from './Component/Payment/Payment';
import NewsLetterConfirm from './Component/Newslatter/NewsLetterConfirm.jsx';
import NewsLetterUnsubscribe from './Component/Newslatter/NewsLetterUnsubscribe.jsx';
import Orders from './Component/Orders/Orders';
import OrderDetail from './Component/Orders/OrderDetail/OrderDetail';
import Review from './Component/Review/Review';
import Locations from './Component/Map/Map';
import DashboardUser from './Component/DashboardUser/Principal/DashboardUser';
import Products from './Component/Products/Products';

const App = () => {

  const user = useSelector(state => state.user);

  return (
    <BrowserRouter >
      <div className="App">
        <NavBar />
        <Switch>
          <Route path={'/step'}  component={Steppers}  /> 
          <Route exact path='/' component={LandingPage} />
          <Route path="/product/:id" component={Detail} />
          <Route path={'/Checkout'}  component={Checkout}  />
          <Route path="/cartpage" component={CartPage} />
          <Route path={'/payment'} component={Payment}  />
          <Route path="/NewsletterConfirm" component={NewsLetterConfirm} />
          <Route path="/NewsletterUnsubscribe" component={NewsLetterUnsubscribe} />
          <Route path={'/orders'} component={Orders}  />
          <Route path={'/orderdetail/:id'} component={OrderDetail}  />
          <Route  path="/review/:id" component={Review}  />  
          <Route path={'/map'} component={Locations} /> 
          
          {user && user.rol === 'client' && (
            <Route  path={"/user"}  component={DashboardUser}  />
            )
          }
          <Route path='/products' component={Products}/>

          
          {
            user && user.rol === 'admin' ?
              <Route path='/admin'>
                <DashboardAdmin />
                <Route path='/admin/products' component={ProductCRUD} />
                <Route path='/admin/orders' component={OrderCRUD} />
                <Route path='/admin/mailing' component={MailingCRUD} />
                <Route path='/admin/reviews' component={ReviewCRUD} />
                <Route path='/admin/location' component={LocationCRUD} />
                <Route path='/admin/users' component={UserCRUD} />
                <Route path='/admin/createproduct' component={CreateProduct}/>
              </Route>         
            :
            <></>
          }
          
          <Route path="*" component={Page404} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
