import Home from "./page/Home/Home.jsx";
import Login from "./page/login/Login.jsx";
import Register from "./page/register/Register.jsx";
import Profile from "./page/Profile/Profile.jsx";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../src/context/Authcontext";

function App() {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/">
                        {user ? <Home /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/login">
                        {user ? <Redirect to="/" /> : <Login />}
                    </Route>
                    <Route path="/register">
                        {user ? <Redirect to="/" /> : <Register />}
                    </Route>
                    <Route path="/users/:username">
                        <Profile />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;





    // useEffect(() => {
    //     socket?.emit("newuser", user?.username)
    // }, [socket, user?.username]);