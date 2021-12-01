import "./Feed.css";
import Post from "../../component/Post/Post.jsx";
import Share from "../../component/Share/Share.jsx";
import { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../config";
import { AuthContext } from "../../context/Authcontext";

export default function Feed({ username }) {
    const { user } = useContext(AuthContext);
    const [posting, setPosting] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = username
                ? await axiosInstance.get(`/posts/${username}/post`)
                : await axiosInstance.get(`/posts/timeline/${user._id}`);
            setPosting(
                res.data.sort((d1, d2) => {
                    return new Date(d2.createdAt) - new Date(d1.createdAt);
                })
            );
        };
        fetchData();
    }, [username, user._id]);
    // posting will update a whole abunch of data?
    // So far, the deleting relies on this!!!!

    return (
        <>
            <div className="feed">
                <Share />
                {posting.map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </>
    );
}

