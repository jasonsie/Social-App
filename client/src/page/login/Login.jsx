import "./login.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/Authcontext";
import { loginCall } from "../../apiCalls";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
    const email = useRef(null);
    const password = useRef(null);
    const { isFetching, dispatch } = useContext(AuthContext);
    // isFetching => boolean
    // dispatch => function

    const clickhandler = (e) => {
        e.preventDefault();
        // collecting the data, sending to apiCall
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Fakebook</h3>
                    <span className="loginDesc">It's too fake to be true.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={clickhandler}>
                        <input
                            className="loginInput"
                            placeholder="Email"
                            type="email"
                            required
                            ref={email}
                        />
                        <input
                            className="loginInput"
                            placeholder="Password"
                            type="password"
                            minLength="7"
                            required
                            ref={password}
                        />
                        <button className="loginButton" type="submit">
                            {isFetching ? (
                                <CircularProgress
                                    style={{ color: "white" }}
                                    size="15px"
                                />
                            ) : (
                                "Log in"
                            )}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to="/register" className="btnContainer">
                            <button
                                className="Btn"
                                type="submit"
                            >
                                Create a New Account
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
