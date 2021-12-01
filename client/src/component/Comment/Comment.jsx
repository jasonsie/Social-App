import "./Comment.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/Authcontext";
import { axiosInstance } from "../../config";

export default function Comment({ commentOrder, posting }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const comment = useRef("");

    const commentHandler = async (e) => {
        e.preventDefault();
        const oldComment = await [...posting.comments];
        oldComment.push([
            { profilePicture: user.profilePicture },
            { userId: user._id },
            { say: comment.current.value },
        ]);

        const data = {
            id: posting._id,
            userId: user._id,
            comments: oldComment,
        };
        try {
            console.log(data)
            await axiosInstance.put(`/posts/${posting._id}`, data);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div
                className="commentInputContainer"
                style={{ display: commentOrder }}
            >
                {posting.comments.map((c) => {
                    if (c[0] === undefined) {
                        return null;
                    } else {
                        return (
                            <>
                                <div className="imgContainer" key={c[1].userId}>
                                    <img
                                        src={PF + c[0].profilePicture}
                                        className="commentProtrait"
                                        alt="no"
                                    />
                                    <div className="sayContainer">
                                        {c[2].say}
                                    </div>
                                </div>
                            </>
                        );
                    }
                })}
                <form className="imgContainer" onSubmit={commentHandler}>
                    <img
                        src={PF + user.profilePicture}
                        alt="nono"
                        className="commentProtrait"
                    />
                    <input
                        type="text"
                        className="commentInput"
                        placeholder="   Write a comment..."
                        ref={comment}
                    />
                    <button className="submitBtn" type="submit">
                        Comment
                    </button>
                </form>
            </div>
        </>
    );
}
