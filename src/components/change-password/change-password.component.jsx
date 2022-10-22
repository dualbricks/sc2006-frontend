import React from 'react';
import { Button } from '..';
import { UpdatePassword } from '../../utils/db/changePassword';
import { UserContext } from '../../contexts';
import { useContext } from 'react';



const ChangePassword = () => {
    const {token} = useContext(UserContext);

    async function handleChangeClick(e) {
        var oldP = document.getElementById("currentPassword");
        var newP = document.getElementById("newPassword");
        var confirmP = document.getElementById("confirmNewPassword");
    
        e.preventDefault();
        if(newP.value !== confirmP.value){
            alert("New Password and Confirm New Password do not match");
            return;
        }
        const options = {
            oldPassword: oldP.value,
            password: confirmP.value
        }
        const response = await UpdatePassword(options, token);
        if(!response) alert("please check your password again");
        else {

            alert("Password Changed Successfully")
        };
    }

    return (
        <div className="ChangePassword">
            <form className="changePassword-Form" onSubmit={handleChangeClick} >
                <div className="currentPassword">
                    <label>Current Password </label>
                    <input type="password" id="currentPassword" name="currentpass" required />
                </div>
                <div className="newPassword">
                    <label>New Password </label>
                    <input type="password" id="newPassword" name="currentpass1" required />
                </div>
                <div className="confirmNewPassword">
                    <label>Confirm New Password </label>
                    <input type="password" id="confirmNewPassword" name="currentpass2" required />
                </div>
                <Button>
                    Confirm Change
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
