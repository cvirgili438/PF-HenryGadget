import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavBar from './Component/NavBar/NavBar.jsx';
import LandingPage from './Component/LandingPage/LandingPage.jsx';
import Detail from './Component/Detail/Detail';
import Footer from './Component/Footer/Footer.jsx';
import Page404 from './Component/Page404/Page404';

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

          <Route path="*">
            <Page404 />
          </Route >

        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
