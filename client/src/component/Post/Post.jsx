import "./Post.css";
import "../Skeleton.css";
import {
    ThumbUp,
    ChatBubbleOutline,
    Reply,
    Create,
    Close,
} from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import EdiInput from "../EditInput/EditInput.jsx";
import Comment from "../Comment/Comment.jsx";
import { axiosInstance } from "../../config";

export default function Post({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length === 0 ? null : post.likes.length);
    const [color, setColor] = useState(post.likes.length === 0 ? "" : "#4267B2");
    const [likeDefault, setLikeDefault] = useState(true);
    const [commnet, setComment] = useState("none");
    const [users, setUsers] = useState({});
    const [edit, setEdit] = useState(post.desc);
    const [edit_orNot, setEdit_orNot] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosInstance.get(`/users?userId=${post.userId}`);
            setUsers(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = async () => {
        likeDefault ? setColor("#4267B2") : setColor("");
        likeDefault ? setLike(like + 1) : setLike(like - 1);
        try {
            await axiosInstance.put(`posts/${post._id}/like`, { userId: user._id });
        } catch (err) {
            console.log(err);
        }
        setLikeDefault(!likeDefault);
    };

    const deleteHandler = async () => {
        alert(" Are you sure ?");
        const data = { userId: user._id };
        try {
            await axiosInstance.delete(`/posts/${post._id}`, { data: data });
            window.location.reload();
        } catch (err) {}
    };

    return (
        <div className="postContainer">
            {user._id === post.userId ? (
                <div className="editContainer">
                    <Create
                        className="penIcon"
                        htmlColor="#4267B2"
                        fontSize="large"
                        onClick={() => {
                            setEdit_orNot(false);
                        }}
                    />
                    <Close
                        className="penIcon"
                        htmlColor="#4267B2"
                        fontSize="large"
                        onClick={deleteHandler}
                    />
                </div>
            ) : (
                ""
            )}

            <div className="postTitle">
                <Link to={`/users/${users.username}`}>
                    <img
                        src={
                            PF + users.profilePicture ||
                            PF + "person/noAvatar.png"
                        }
                        alt="no"
                        className="protrait skeleton_img"
                    />
                </Link>
                <div>
                    <span className="skeleton_text">{users.username}</span>
                    <div className="postMin">{format(post.createdAt)}</div>
                </div>
            </div>
            <div className="postContent">
                {edit_orNot ? (
                    <div className="postDesc skeleton_text">{edit}</div>
                ) : (
                    <EdiInput
                        edit={edit}
                        setEdit={setEdit}
                        post={post}
                        user={user}
                        setEdit_orNot={setEdit_orNot}
                    />
                )}
                <img
                    className="postImgContainer skeleton_img"
                    src={PF + post.img}
                    alt="no"
                />
            </div>
            <div className="likeIconContainer">
                <img className="likeIcon" src={PF + "like.png"} alt="no" />
                <span className="postLikeCounter">{like}</span>
            </div>
            <hr className="postHr" />
            <div className="commentContainer">
                <button className="iconContainer" onClick={likeHandler}>
                    <ThumbUp htmlColor={color} fontSize="large" />
                    <span>Like</span>
                </button>
                <button className="iconContainer">
                    <ChatBubbleOutline fontSize="large" />
                    <span
                        onClick={() => {
                            setComment(commnet === "none" ? "block" : "none");
                        }}
                    >
                        Comment
                    </span>
                </button>
                <button className="iconContainer">
                    <Reply fontSize="large" />
                    <span>Share</span>
                </button>
            </div>
            <hr className="postHr" />
            <Comment commentOrder={commnet} posting={post} />
        </div>
    );
}
