import "./Header.css";
// import { Search, Forum, Public, SupervisorAccount } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";

export default function Header() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user, dispatch } = useContext(AuthContext);

    const clickHandler = async () => {
        await dispatch({ type: "LOGOUT" });
        // await socket.emit("disconnection")

    };

    return (
        <div className="headerContainer">
            <div className="logoContainer">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="fakebookIcon">fakebook</span>
                </Link>
                {/* <div className="notificationIcon">
                    <div className="notification">
                        <span className="notificationNum">1</span>
                    </div>
                    <Forum htmlColor="#213864" fontSize="large" />
                </div>
                <div className="notificationIcon">
                    <div className="notification">
                        <span className="notificationNum">5</span>
                    </div>
                    <Public htmlColor="#213864" fontSize="large" />
                </div>
                <div className="notificationIcon">
                    <div className="notification">
                        <span className="notificationNum">19</span>
                    </div>
                    <SupervisorAccount htmlColor="#213864" fontSize="large" />
                </div> */}
            </div>
            {/* <div className="searchContainer">
                <input
                    type="text"
                    name="searchInput"
                    placeholder=" Search..."
                    className="searchInput"
                />
                <Search
                    htmlColor="white"
                    className="searchIcon"
                    fontSize="large"
                />
            </div> */}
            <div className="rightContainer">
                <Link
                    className="logInContainer"
                    to="/logIn"
                    style={{ textDecoration: "none" }}
                    onClick={clickHandler}
                >
                    <img
                        src={
                            PF + user.profilePicture ||
                            PF + "person/noAvatar.png"
                        }
                        alt="no"
                        className="shareProtrait skeleton_img"
                    />
                    <span className="logInIcon">
                        {user ? "Log Out" : "Log In"}
                    </span>
                </Link>
            </div>
        </div>
    );
}
