import "./App.css";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Home from "./Components/Home";
import SideMenuBar from "./Components/SideMenuBar";
import User from "./Components/teamuser";
import user from "./Components/user";
import Team from "./Components/team";
import News from "./Components/teamNews";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./Components/forgotPassword";
import VerificationCode from "./Components/verificationCode";
import TabComponent from "./Components/Tab"
import NewsFeed from "./Components/NewsFeed";
function App() {
  return (
    <div>
   
        <BrowserRouter>
          <Routes>
            <Route exact path="/" Component={LoginPage} />
            <Route exact path="/SideMenuBar" Component={SideMenuBar} />
            <Route exact path="/Home" Component={Home} />
            <Route exact path="/TeamUser" Component={User} />
            <Route exact path="/user" Component={user}/>
            <Route exact path="/Team" Component={Team} />
            <Route exact path="/News" Component={News} />
            <Route exact path="/NewsFeed" Component={NewsFeed}/>
            <Route exact path="/forgotPassword" Component={ForgotPassword} />
            <Route exact path="/tab" Component={TabComponent }/>
            <Route
              exact
              path="/verificationCode"
              Component={VerificationCode}
            />
          </Routes>
        </BrowserRouter>
     
    </div>
  );
}

export default App;
