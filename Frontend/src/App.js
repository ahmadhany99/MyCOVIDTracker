import React from "react";
import Signup from "./Components/Signup";
import HomePage from "./Components/HomePage";
import UsernameWeb from "./Components/UsernameWeb";
import Login from "./Login";
import Header from "./Header";
import Admin from "./Components/Admin";
import BlankPage from "./Components/BlankPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/UsernameWeb" element={<UsernameWeb />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/BlankPage" element={<BlankPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;