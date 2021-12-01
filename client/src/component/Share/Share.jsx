import "./Share.css";
import "../Skeleton.css";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/Authcontext";
import {
    ListAlt,
    PhotoSizeSelectActual,
    InsertLink,
    Videocam,
    LiveHelp,
    Cancel,
} from "@material-ui/icons";
import { axiosInstance } from "../../config";
import { Link } from "react-router-dom";

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const desc = useRef();

    const postHandler = async (e) => {
        e.preventDefault();
        console.log(file);

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            data.append("fieldname", "file");
            newPost.img = `upload/${fileName}`;
            try {
                await axiosInstance.post("/uploading", data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axiosInstance.post("/posts/", newPost);
            window.location.reload();
            // trying to use a post context to update your post state too
        } catch (err) {}
    };

    return (
        <>
            <form className="feedContainer" onSubmit={postHandler}>
                <div className="topContainer">
                    <Link to={`/users/${user.username}`}>
                        <img
                            src={
                                PF + user.profilePicture ||
                                PF + "person/noAvatar.png"
                            }
                            alt="no"
                            className="shareProtrait skeleton_img"
                        />
                    </Link>
                    <input
                        className="feedInput"
                        type="text"
                        placeholder="  Write something..."
                        ref={desc}
                    />
                </div>
                {file && (
                    <div className="shareImgContainer">
                        <img
                            className="shareImg"
                            src={URL.createObjectURL(file)}
                            alt=""
                        />
                        <Cancel
                            fontSize="large"
                            className="shareCancelImg"
                            onClick={() => setFile(null)}
                        />
                    </div>
                )}
                <div className="feedIconFlex">
                    <label className="feedIconContainer">
                        <ListAlt htmlColor="#4267B2" fontSize="large" />
                        <span>Status</span>
                    </label>

                    <label
                        htmlFor="image"
                        className="feedIconContainer RWDremain"
                    >
                        <PhotoSizeSelectActual
                            htmlColor="#4267B2"
                            fontSize="large"
                        />
                        <span>Photo</span>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="image"
                            accept=".jpeg, .jpg, .png"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
                    <label className="feedIconContainer">
                        <InsertLink htmlColor="#4267B2" fontSize="large" />
                        <span>Link</span>
                    </label>
                    <label className="feedIconContainer">
                        <Videocam htmlColor="#4267B2" fontSize="large" />
                        <span>Video</span>
                    </label>
                    <label className="feedIconContainer">
                        <LiveHelp htmlColor="#4267B2" fontSize="large" />
                        <span>Question</span>
                    </label>
                    <button type="submit" className="postBtn RWDremain">
                        Post
                    </button>
                </div>
            </form>
        </>
    );
}
