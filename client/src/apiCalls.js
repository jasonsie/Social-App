import { axiosInstance } from "./config";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axiosInstance.post("/auth/login", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
        alert("Wrong password")
    }
};

export const registerCall = async (req, dispatch) => {
    try{
        const response = await axiosInstance.post("/auth/register", req);
        console.log(response)
        dispatch({ type: "REGISTER_SUCCESS", payload: response.data })
    }catch(error){
        dispatch({ type: "REGISTER_FAILURE", payload: error })
    }
};
