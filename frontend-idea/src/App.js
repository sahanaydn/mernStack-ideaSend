import FikirGonder from "./components/FikirGonder";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminGiris from "./components/AdminGiris";
import Fikirler from "./components/Fikirler";
import KayitOl from "./components/KayitOl";

function App() {
  return (
    <Router>
      <div className="text-center mt-3">
        <Switch>
          <Route path="/AdminPage" component={AdminGiris} />
          <Route path="/" component={FikirGonder} exact />
          <Route path="/fikirler" component={Fikirler} exact />
          <Route path="/kayitOl" component={KayitOl} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
