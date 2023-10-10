import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../../services/auth-service";
import { UserContext } from "../../store/user-context";

// import img
import bloodPressure from "../../static/Img/bloodPressure.png";
import user from "../../static/Img/user.png";
import login from "../../static/Img/login.png";
import logout from "../../static/Img/logout.png";

// import ButtonElement
import NavButton from "../UI/NavButton.jsx";
import UserButton from "../UI/UserButton";

const Header = () => {
  const { getCurrentUser, currentUser, logoutUser } = useContext(UserContext);

  useEffect(() => {
    getCurrentUser();
  }, []);

  let navigation = [
    { name: "首頁", href: "/" },
    { name: "關於我們", href: "/about" },
    { name: "新增紀錄", href: "/newrecord" },
    { name: "查看", href: "/bloody-detail" },
  ];

  const navList = navigation.map((item) => (
    <NavButton key={item.name} item={item} />
  ));

  const logoutHandler = () => {
    AuthService.logout();
    logoutUser();
  };

  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={bloodPressure} alt="bloodpressure" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">{navList}</ul>
          <ul className="nav navbar-nav navbar-right">
            {!currentUser ? (
              // user hasn't login
              <React.Fragment>
                <UserButton pic={user} content={"註冊"} href={"register"} />
                <UserButton pic={login} content={"登入"} href={"login"} />
              </React.Fragment>
            ) : (
              // user has login already
              <React.Fragment>
                <UserButton pic={user} content={"個人資料"} href={"profile"} />
                <UserButton
                  handler={logoutHandler}
                  pic={logout}
                  content={"登出"}
                  href={""}
                />
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
