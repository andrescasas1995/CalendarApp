import React from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from "react-router-dom";
import LoginScreen from "../component/auth/LoginScreen";
import CalendarScreen from "../component/calendar/CalendarScreen";

const AppRouter = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/" component={CalendarScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
