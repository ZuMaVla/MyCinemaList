import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAuth } from "../../contexts/authContext";

const ResetPasswordForm: React.FC = () => {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //console.log("Submitted: ", email);
        try {
            await resetPassword(email);
            alert("Check your email to reset the password")
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                label="Email"
                type="email"
                placeholder="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
                type="submit" 
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
            >
                Reset Password
            </Button>
        </Box>
    );
};

export default ResetPasswordForm;