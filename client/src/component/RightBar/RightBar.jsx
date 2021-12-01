import "./RightBar.css";
import FriendList from "../../component/FriendList/FriendList.jsx";
import { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../config";
import { AuthContext } from "../../context/Authcontext";
import { Link } from "react-router-dom";

export default function RightBar({ profile, userId }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser, dispatch } = useContext(AuthContext);
    let [users, setUsers] = useState([]);
    let [follow, setFollow] = useState(currentUser.followings.includes(userId)); 
    // return bool, the userId can only refelct the change from home not from profile

    useEffect(() => {
        const fetchFriends = async () => {
            const res = await axiosInstance.get(`/users/friends/${currentUser._id}`);
            setUsers(res.data);
        };

        fetchFriends();
    }, [currentUser._id, follow]);

    const Home = () => {
        return (
            <>
                <div className="listTitle">Friends</div>
                <hr className="rightHr" />
                {users.map((u) => (
                    <FriendList key={u._id} user={u} />
                ))}
                <hr className="rightHr" />
                <div className="sponsorContainer"></div>
            </>
        );
    };

    const Profile = () => {
        const followHandler = async () => {
            console.log("1");
            const data = { id: userId };

            if (follow) {
                console.log(`follow=> ${follow}`);
                await axiosInstance.put(`/users/unfollow/${currentUser._id}`, data);
                dispatch({ type: "UNFOLLOW", payload: currentUser._id });
            } else {
                console.log(`follow=> ${follow}`);
                await axiosInstance.put(`/users/follow/${currentUser._id}`, data);
                dispatch({ type: "FOLLOW", payload: currentUser._id });

            }
            setFollow(!follow);

        };

        return (
            <>
                <div className="followContainer" onClick={followHandler}>
                    {follow ? "Following" : "Follow"}
                </div>
                <div className="infoCon">
                    About
                    <div className="infoCon">
                        <div>
                            City: <span>{currentUser.city}</span>
                        </div>
                        <div>
                            from: <span>{currentUser.from}</span>
                        </div>
                        <div>
                            Relationship: <span>{currentUser.relationship}</span>
                        </div>
                        <div>
                            Intro: <span>{currentUser.desc}</span>
                        </div>
                    </div>
                </div>
                <hr className="rightHr" />
                <div className="friendCon">
                    {users.map((u) => (
                        <Link
                            className="friendInfo"
                            key={u._id}
                            to={`/users/${u.username}`}
                            style={{ textDecoration: "none" }}
                        >
                            <img src={PF + u.profilePicture} alt="no" />
                            <div className="friendName">{u.username}</div>
                        </Link>
                    ))}
                </div>
                <hr className="rightHr" />
            </>
        );
    };

    return <div className="rightBar">{profile ? <Profile /> : <Home />}</div>;
}
