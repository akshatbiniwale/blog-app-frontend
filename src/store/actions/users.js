import { userAction } from "../reducers/userReducer";

export const logout = () => (dispatch) => {
    dispatch(userAction.resetUserInfo());
    localStorage.removeItem("account");
};
