import "./register.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { registerCall } from "../../apiCalls"
import { AuthContext } from "../../context/Authcontext";



export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const {dispatch} = useContext(AuthContext);


    const clickHandler = (e) => {
        e.preventDefault();
        registerCall({
          username:username.current.value,
          email:email.current.value,
          password:password.current.value
        }, dispatch)
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FakeBook</h3>
                    <span className="loginDesc">
                        Ouch, It's too fake to be true.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={clickHandler}>
                        <input
                            placeholder="Username"
                            className="loginInput"
                            type="Text"
                            required
                            ref = {username}
                        />
                        <input
                            placeholder="Email"
                            className="loginInput"
                            type="Email"
                            required
                            ref = {email}

                        />
                        <input
                            placeholder="Password"
                            className="loginInput"
                            type="Password"
                            required
                            ref = {password}
                        />
                        <input
                            placeholder="Password Again"
                            className="loginInput"
                            type="Password"
                            required
                        />
                        <button className="loginButton" type="submit">
                            Sign Up
                        </button>
                        <Link to="/login" className="btnContainer">
                            <button className="Btn">
                                Log into Account
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
