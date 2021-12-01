import React, { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    // using LocalStorage
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};
// export context
export const AuthContext = createContext(INITIAL_STATE);

// draw the region for context
// socket setting
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};




// const [socket, setSocket] = useState(null);

// useEffect(() => {
//     setSocket(io("http://localhost:1111"));
// }, []);