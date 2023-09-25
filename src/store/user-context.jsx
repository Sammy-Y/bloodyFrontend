import { createContext } from "react";

export const UserContext = createContext({
  currentUser: null,
  userName: "",
  userId: "",
  registerUser: () => {},
  getCurrentUser: () => {},
  logoutUser: () => {},
});
