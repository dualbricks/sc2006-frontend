import userEvent from "@testing-library/user-event";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts";
import { LogOutUser } from "../../utils/db";
import { Button } from "@mui/material";
import "./menu.style.scss";

const Menu = ({toggler}) => {
  // to implement logout
  const { setUser, setToken, setIsAuthenticated } = useContext(UserContext);
  const { token } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');


  const onLogout = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    e.currentTarget.disabled = true;
    try {
      await LogOutUser(token);
      setUser([]);
      setToken("");
      setIsAuthenticated(false);
    } catch (err) {
      setUser([]);
      setToken("");
      setIsAuthenticated(false);
      setErrorMessage("You are already logged out from other device");
    }
  };

  //
  return (
    <div className="container">
      <div className="align-center">
        <div className="row">

        </div>
        <div className="row">
          <Button className="menu-button" href="/settings" variant="contained" size="large">Account</Button>
        </div>
        <div className="row">
         <Button className="menu-button" href="/expenditure" variant="contained" size="large">Expenditure</Button>
        </div>
        <div className="row">
         <Button className="menu-button" href="/traffic" variant="contained" size="large">Traffic</Button>
        </div>
        <div className="row">
         <Button className="menu-button" onClick={toggler} variant="contained" size="large">Cost Calculator</Button>
        </div>
        <div className="row">
        <Button className="menu-button"  variant="contained" onClick={onLogout} size="large">
          Logout
        </Button>
        </div>

      </div>
    
      <p>{errorMessage}</p>
    </div>
  );
};

export default Menu;
