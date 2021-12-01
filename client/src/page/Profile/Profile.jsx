import "./Profile.css";
import Header from "../../component/Header/Header.jsx";
import SideBar from "../../component/SideBar/SideBar.jsx";
import RightBar from "../../component/RightBar/RightBar.jsx";
import Feed from "../../component/Feed/Feed.jsx";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import  { axiosInstance }  from "../../config";
import "../../component/Skeleton.css"

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;
    const [user, setUser] = useState({});
    const userId = user._id;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosInstance.get(`/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    },[username]);




    return (
        <>
            <Header />
            <div className="content">
                <div className="left">
                    <SideBar profile />
                </div>
                <div className="middle">
                    <div className="heroContainer">
                        <img
                            className="heroCon skeleton_img"
                            src={user.coverPicture? PF + user.coverPicture:PF + "cover/noCover.png"}
                            alt="no"
                        />
                        <div className="userInfoCon">
                            <img
                                className="proCon skeleton_img"
                                src={user.profilePicture? PF + user.profilePicture:PF + "person/noAvatar.png"}
                                alt="no"
                            />
                            <div className="userinfo">
                                <div className="userName">{user.username}</div>
                                <div>{ user.desc? user.desc: "Say something to the world..."}</div>
                            </div>
                        </div>
                    </div>
                    <div className="buttom">
                        <Feed  username ={username}/>
                        <RightBar profile userId={userId}/>
                    </div>
                </div>
            </div>
        </>
    );
}

