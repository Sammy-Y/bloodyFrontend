import { useReducer } from "react";
import { UserContext } from "./user-context";
import AuthService from "../services/auth-service";

export const defaultUserState = {
  currentUser: null,
  userName: "",
  userId: "",
};

export const ACTION = {
  REGISTER: "REGISTER",
  GETUSER: "GETUSER",
  LOGOUT: "LOGOUT",
};

export const UserReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION.REGISTER:
      return {
        userName: payload.userName,
        userId: payload.userId,
      };

    case ACTION.GETUSER:
      return {
        currentUser: payload.currentUser,
      };

    case ACTION.LOGOUT:
      return {
        currentUser: null,
      };

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [userState, dispatchUserAction] = useReducer(
    UserReducer,
    defaultUserState
  );

  const registerUserHandler = (userContent) => {
    dispatchUserAction({
      type: ACTION.REGISTER,
      payload: {
        userName: userContent.userName,
        userId: userContent.userId,
      },
    });
  };

  const getCurrentUserHandler = () => {
    dispatchUserAction({
      type: ACTION.GETUSER,
      payload: {
        currentUser: AuthService.getCurrentUser(),
      },
    });
  };

  const logoutUser = () => {
    dispatchUserAction({
      type: ACTION.LOGOUT,
      payload: {
        currentUser: null,
      },
    });
  };

  const userContext = {
    currentUser: userState.currentUser,
    userName: userState.userName,
    userId: userState.userId,
    registerUser: registerUserHandler,
    getCurrentUser: getCurrentUserHandler,
    logoutUser,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
