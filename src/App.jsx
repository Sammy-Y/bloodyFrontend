import React from "react";
import { Routes, Route } from "react-router-dom";

// User
import LoginComponent from "./components/user/LoginComponent";
import SignupComponent from "./components/user/SignupComponent";
import SuccessComponent from "./components/user/SuccessComponent";
import ProfileComponent from "./components/user/ProfileComponent";

// Blood
import NewBloodyComponent from "./components/Bloody/NewBloodyComponent";

import Header from "./components/Layout/Header";
import HomeComponent from "./components/HomeComponent";
import Footer from "./components/Layout/Footer";
import { UserProvider } from "./store/UserProvider";
import ComfirmComponent from "./components/user/ComfirmComponent";
import BloodyDetailComponent from "./components/Bloody/BloodyDetailComponent";
import CalendarComponent from "./components/Bloody/CalendarComponent";
import DashboardComponent from "./components/Bloody/DashboardComponent";

function App() {
  return (
    <UserProvider>
      <React.Fragment>
        <header className="pb-5 border-bottom border-dark">
          <Header />
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<HomeComponent />} exact />
            <Route path="/login" element={<LoginComponent />} exact />
            <Route path="/register" element={<SignupComponent />} exact />
            <Route path="/newrecord" element={<NewBloodyComponent />} exact />
            <Route
              path="/register/success"
              element={<SuccessComponent />}
              exact
            />
            <Route path="/profile" element={<ProfileComponent />} exact />
            <Route
              path="/confirmation/:token"
              element={<ComfirmComponent />}
              exact
            />
            <Route path="/bloody-detail" element={<BloodyDetailComponent />} />
            <Route path="/calendar" element={<CalendarComponent />} />
            <Route path="/dashboard" element={<DashboardComponent />} />
          </Routes>
        </main>
        <footer className="pb-5 border-top border-dark  mt-5">
          <Footer />
        </footer>
      </React.Fragment>
    </UserProvider>
  );
}

export default App;
