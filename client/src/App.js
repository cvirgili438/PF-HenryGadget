import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './Component/LandingPage/LandingPage.jsx';
import NavBar from './Component/NavBar/NavBar';
import Detail from './Component/Detail/Detail';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          </Route>
        </Switch>     
        <Route exact path="/product/:id" component={Detail} />
      </div>
    </BrowserRouter>
  );
}

export default App;