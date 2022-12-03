import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LandingPage from './Component/LandingPage/LandingPage.jsx';
import NavBar from './Component/NavBar/NavBar';
import Detail from './Component/Detail/Detail';


const App = () => {
  
  return (
    <BrowserRouter >
      <div className="App">
        <Switch >
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/'>
            <NavBar />
          </Route>
        </Switch>     
        <Route exact path="/home/:id" component={Detail} />
      </div>
    </BrowserRouter>
  );
}

export default App;