import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavBar from './Component/NavBar/NavBar.jsx';
import LandingPage from './Component/LandingPage/LandingPage.jsx';
import Detail from './Component/Detail/Detail';
import Footer from './Component/Footer/Footer.jsx';
import Page404 from './Component/Page404/Page404';

import DashboardAdmin from './Component/Admin/DashboardAdmin/DashboardAdmin';
import ProductCRUD from './Component/Admin/ProductCRUD/ProductCRUD.jsx';
import OrderCRUD from './Component/Admin/OrderCRUD/OrderCRUD.jsx';
import MailingCRUD from './Component/Admin/MailingCRUD/MailingCRUD.jsx';
import ReviewCRUD from './Component/Admin/ReviewCRUD/ReviewCRUD.jsx';
import UserCRUD from './Component/Admin/UserCRUD/UserCRUD.jsx';

const App = () => {
  return (
    <BrowserRouter >
      <div className="App">
        <Switch>

          <Route exact path='/'>
            <NavBar />
            <Route exact path='/' component={LandingPage} />
            <Footer />
          </Route>

          <Route path='/product'>
            <NavBar />
            <Route path="/product/:id" component={Detail} />
            <Footer />
          </Route>
          <Route path='/admin'>
            <DashboardAdmin />
            <Route path='/admin/products' component={ProductCRUD} />
            <Route path='/admin/orders' component={OrderCRUD} />
            <Route path='/admin/mailing' component={MailingCRUD} />
            <Route path='/admin/reviews' component={ReviewCRUD} />
            <Route path='/admin/users' component={UserCRUD} />
          </Route>

          <Route path="*">
            <Page404 />
          </Route >
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
