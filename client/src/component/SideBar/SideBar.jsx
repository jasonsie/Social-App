import "./SideBar.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import {
    FileCopy,
    AddPhotoAlternate,
    Group,
    Explicit,
    Today,
    ArrowDropDown,
} from "@material-ui/icons";
import { AuthContext } from "../../context/Authcontext";
import "../Skeleton.css";

export default function SideBar({ profile }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // testing code
    const { user } = useContext(AuthContext);
    let [theUser, setTheUser] = useState({});

    useEffect(() => {
        const fetchTheUser = async () => {
            const res = await axiosInstance.get(`/users?username=${user.username}`);
            setTheUser(res.data);
        };

        fetchTheUser();
    },[user.username]);

    const Home = () => {
        return (
            <>
                <Link className="ProtraitContainer" to={`/users/${user.username}`}>
                    <img
                        className="ProtraitImg skeleton_img"
                        src={
                            theUser.profilePicture
                                ? PF + theUser.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt="nonoImage"
                    />
                </Link>
                <Link className="itemName itemContainerApp" to="/">
                    <div>Application</div>
                </Link>
                <ul className="itemContainer">
                    <li>
                        <FileCopy htmlColor="#4267B2" fontSize="large" />
                        <span className="itemName">Ads and Pages</span>
                    </li>
                    <li>
                        <AddPhotoAlternate
                            htmlColor="#4267B2"
                            fontSize="large"
                        />
                        <span className="itemName">Photos</span>
                    </li>
                    <li>
                        <Group htmlColor="#4267B2" fontSize="large" />
                        <span className="itemName">Groups</span>
                    </li>
                    <li>
                        <Explicit htmlColor="#4267B2" fontSize="large" />
                        <span className="itemName">Events</span>
                    </li>
                    <li>
                        <Today htmlColor="#4267B2" fontSize="large" />
                        <span className="itemName">Wall</span>
                    </li>
                </ul>
                <div className="moreContainer">
                    <ArrowDropDown htmlColor="#4267B2" fontSize="large" />
                    <div className="moreBtn">more</div>
                </div>
                <hr className="sidebarHr" />
            </>
        );
    };

    const Profile = () => {
        return (
            <>
                <Link className="itemName itemContainerApp" to="/">
                    <div>Application</div>
                </Link>
                <ul className="itemContainer">
                    <li>
                        <FileCopy htmlColor="#4267B2" fontSize="large" />
                        <span className="itemName">Ads and Pages</span>
                    </li>
                    <li>
                        <AddPhotoAlternate
                            htmlColor="#4267B2"
                            fontSize="large"
                        />
                        <span className="itemName">Photos</span>
                    </li>
                    <li>
                        <Group htmlColor="#4267B2" fontSize="large" />
                        <span className="itemName">Groups</span>
                    </li>
                    <li>
                        <Explicit htmlColor="#4267B2" fontSize="large" />
                        <span className="itemName">Events</span>
                    </li>
                    <li>
                        <Today htmlColor="#4267B2" fontSize="large" />
                        <span className="itemName">Wall</span>
                    </li>
                </ul>
                <div className="moreContainer">
                    <ArrowDropDown htmlColor="#4267B2" fontSize="large" />
                    <div className="moreBtn">more</div>
                </div>
                <hr className="sidebarHr" />
            </>
        );
    };

    return <div className="SideBar">{profile ? <Profile /> : <Home />}</div>;
}
