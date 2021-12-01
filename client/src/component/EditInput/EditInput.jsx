import "./EditInput.css";
import { axiosInstance } from "../../config";
import { CheckBox } from "@material-ui/icons";

export default function EditInput({
    edit,
    setEdit,
    post,
    user,
    setEdit_orNot,
}) {
    const onChangeHandler = (e) => {
        setEdit(e.target.value);
    };

    const editHandler = async () => {
        setEdit_orNot(true);
        const data = {
            id: post._id,
            userId: user._id,
            desc: edit,
        };
        try {
            await axiosInstance.put(`/posts/${post._id}`, data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <input
                className="editInput"
                type="text"
                value={edit}
                onChange={(e) => {
                    onChangeHandler(e);
                }}
            />
            <CheckBox
                className="editBtn"
                onClick={editHandler}
                htmlColor="red"
            />
        </>
    );
}
