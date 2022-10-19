import React from 'react';
import { Button } from '..';
import { changePassword } from '../../routes';

// export default function changePassword() {
//     const nav = useNavigate();
//     const [fields, handleFieldChange] = useFormFields({
//         password: "",
//         oldPassword: "",
//         confirmPassword: "",
//     });
//     const [isChanging, setIsChanging] = useState(false);
  
//     function validateForm() {
//         return (
//             fields.oldPassword.length > 0 &&
//             fields.password.length > 0 &&
//             fields.password === fields.confirmPassword
//         );
//     }
  
//     async function handleChangeClick(event) {
//         event.preventDefault();

//         setIsChanging(true);

//         try {
//             const currentUser = await Auth.currentAuthenticatedUser();
//             await Auth.changePassword(
//                 currentUser,
//                 fields.oldPassword,
//                 fields.password
//         );

//         nav("/settings");
//         } catch (error) {
//             error(error);
//             setIsChanging(false);
//         }
//     }
// };


function handleChangeClick(e) {
    var oldP=document.getElementById("currentPassword").value;
    var newP=document.getElementById("newPassword").value;
    var confirmP =document.getElementById("confirmNewPassword").value;

    e.preventDefault();
    
    //lines 52 to 63 to be placed after checks once it connects up to backend
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
    };

    fetch("localhost", requestOptions) //localhost is placeholder, waiting for server to be up
        .then(response => response.json())
        .then(data => alert(data));

    if(oldP!=""&&newP!=""&&confirmP!="")
    {
        if(oldP!=newP)
        {
            if(newP==confirmP)
            {
                return true;
            }
            else
            {
                alert("Confirm password is not same as you new password.");
                return false;
            }
        }
        else
        {
            alert(" This Is Your Old Password,Please Provide A New Password");
            return false;
        }
    }
    else
    {
        alert("All Fields Are Required");
        return false;
    }
}


const ChangePassword = (props) => {
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
