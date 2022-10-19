import userEvent from "@testing-library/user-event";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts";
import { LogOutUser } from "../../utils/db";
import "./menu.style.scss";

const Menu = () => {
  // to implement logout
  const { setUser, setToken, setIsAuthenticated } = useContext(UserContext);
  const { token } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');


  const onLogout = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    e.currentTarget.disabled = true;
    try {
      const data = await LogOutUser(token);
      setUser(null);
      setToken("");
      setIsAuthenticated(false);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.toString());
      e.currentTarget.disabled = false;
    }
  };

  //
  return (
    <div className="menu">
      <Link to="/settings">
        <button className="menu-button">Account</button>
      </Link>
      <Link to="/expenditure">
        <button className="menu-button">Expenditure</button>
      </Link>
      <Link to="/traffic">
        <button className="menu-button">Traffic</button>
      </Link>
      <p>{errorMessage}</p>
      <button className="menu-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Menu;
