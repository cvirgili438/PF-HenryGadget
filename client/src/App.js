import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LandingPage from './Component/LandingPage/LandingPage.jsx';
import Detail from './Component/Detail/Detail';


const App = () => {
  
  return (
    <BrowserRouter >
      <div className="App">
        <Switch >
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path={'/home/:id'}>
              <Detail/>
          </Route>
        </Switch>      
      </div>
    </BrowserRouter>
  );
}

export default App;