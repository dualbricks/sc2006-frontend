import React from 'react';
import { UpdatePassword } from '../../utils/db/changePassword';
import { UserContext } from '../../contexts';
import { useContext, useState } from 'react';
import { Box, Paper, TextField } from '@mui/material';
import { Form } from 'react-bootstrap';
import {LoadingButton} from '@mui/lab';
import IconButton from "@mui/material/IconButton";
import  SaveIcon  from '@mui/icons-material/Save'

const ChangePassword = () => {
    const {token} = useContext(UserContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    async function handleChangeClick(e) {
        setLoading(true);
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            setLoading(false);
            return;
        }

        const options = {
            oldPassword: oldPassword,
            password: confirmPassword
        }
        const response = await UpdatePassword(options, token);
        if(!response) alert("please check your password again");
        else {

            alert("Password Changed Successfully")
        };
        setLoading(false);
    }

    return (
        <Box textAlign='center' marginTop="20">
            <Paper>
            <Form id="changePasswordForm" onSubmit={handleChangeClick}>
                <Form.Group className="mb-3" controlId="currentPassword">
                    <TextField type="password" label="Current Password" value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}}variant="outlined"  required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newPassword">
                    <TextField type="password" label="New Password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} variant="outlined" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmNewPassword">
                    <TextField type="password" label="Confirm New Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} variant="outlined" required/>
                </Form.Group>
                    <LoadingButton 
                        size="large"
                        loadingPosition='start'
                        loading={loading}
                        startIcon={<SaveIcon/>} 
                        variant='outlined'
                        form='changePasswordForm'
                        type='submit'
                        >
                        Change Password
                    </LoadingButton>
            </Form>
            </Paper>
        </Box>
        
    );
};

export default ChangePassword;
