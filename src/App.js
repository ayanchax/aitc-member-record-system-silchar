 
import './App.css';
import SignaturePad from "react-signature-pad"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import RegistrationFormScreen from './screens/RegistrationFormScreen';
import MembersListScreen from './screens/MembersListScreen';
function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path='/'><HomeScreen/></Route>
            <Route  path='/registration'><RegistrationFormScreen/></Route>
            <Route  path='/silchar/aitc-members'><MembersListScreen/></Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
