import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../../services/auth-service";
import { UserContext } from "../../store/user-context";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

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
  ];

  const loginNavi = [
    { name: "首頁", href: "/" },
    // { name: "關於我們", href: "/about" },
    { name: "查看紀錄", href: "/bloody-detail" },
    { name: "行事曆", href: "/calendar" },
    { name: "圖表", href: "/dashboard" },
  ]

  // 依照是否有登入來顯示不同的navBar
  const navList = (currentUser ? loginNavi : navigation).map((item) => (
    <NavButton key={item.name} item={item} />
  ));

  const logoutHandler = () => {
    AuthService.logout();
    logoutUser();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      {/* <nav className="navbar navbar-expand-sm bg-light navbar-light"> */}
      <Container>
        <Navbar.Brand href="/">
          <img src={bloodPressure} alt="bloodpressure" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
