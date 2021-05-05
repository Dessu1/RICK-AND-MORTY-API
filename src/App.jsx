import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Characters from "./views/Characters";
import Navbar from "./components/Navbar";
import Episodes from "./views/Episodes";
import Locations from "./views/Locations";

function App() {
  return (
    <div id='web-site'>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Characters />
        </Route>
        <Route exact path='/characters'>
          <Characters />
        </Route>
        <Route exact path='/episodes'>
          <Episodes />
        </Route>
        <Route exact path='/locations'>
          <Locations />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
