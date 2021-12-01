export const LoginStart = (userCredential) => ({
    type: "LOGIN_START",
  });
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  });

  export const RegisterSuccess = (user) => ({
    type: "REGISTER_SUCCESS",
    payload: user,
  });

  export const RegisterFailure = (error) => ({
    type: "REGISTER_FAILURE",
    payload: error,
  });

  export const LogOut = (user) => ({
    type: "LOGOUT",
    payload: user
  })

  export const Follow = (currentUser) => ({
    type: "FOLLOW",
    payload: currentUser._id,
  });
  
  export const Unfollow = (currentUser) => ({
    type: "UNFOLLOW",
    payload: currentUser._id,
  });

  