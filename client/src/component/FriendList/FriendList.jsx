import "./FriendList.css";
import { Link } from "react-router-dom";

export default function FriendList({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <Link
            className="midList"
            to={`/users/${user.username}`}
            style={{ textDecoration: "none" }}
        >
            <button className="listName">
                <img
                    className="userProtrait skeleton_img"
                    src={PF + user.profilePicture}
                    alt="noImage"
                />
                <span>{user.username}</span>
            </button>
        </Link>
    );
}
