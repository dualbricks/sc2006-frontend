
import { useContext, useState } from "react";
import { UserContext } from "../../contexts";
import { LogOutUser } from "../../utils/db";
import { Button } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CalculateIcon from '@mui/icons-material/Calculate';
import LogoutIcon from '@mui/icons-material/Logout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from "react-router-dom";
import "./menu.style.scss";

const Menu = ({toggler}) => {
  // to implement logout
  const { setUser, setToken, setIsAuthenticated } = useContext(UserContext);
  const { token } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const onLogout = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    e.currentTarget.disabled = true;
    try {
      await LogOutUser(token);
      setUser([]);
      setToken("");
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      setUser([]);
      setToken("");
      setIsAuthenticated(false);
      setErrorMessage("You are already logged out from other device");
      navigate("/");
    }
  };

  //
  return (
    <div >
      <div className="align-center">
        <div className="row">
          <Button startIcon={<ManageAccountsIcon/>} className="menu-button" href="/settings" variant="contained" size="large">Account</Button>
        </div>
        <div className="row">
         <Button startIcon={<AttachMoneyIcon/>} className="menu-button" href="/expenditure" variant="contained" size="large">Expenditure</Button>
        </div>
        <div className="row">
         <Button startIcon={<CalculateIcon/>} className="menu-button" onClick={toggler} variant="contained" size="large">Cost Calculator</Button>
        </div>
        <div className="row">
        <Button startIcon={<LogoutIcon/>} className="menu-button"  variant="contained" onClick={onLogout} size="large">
          Logout
        </Button>
        </div>

      </div>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Menu;
