import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAuth } from "../../contexts/authContext";

const SignInForm: React.FC = () => {
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //console.log("Submitted: ", email);
        try {
            await signIn(email, password);  
            alert("You are signed in!");
        } catch (err: any) {
            alert(`${err.message}`);
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
            <TextField
                label="Password"
                type="password"
                placeholder="Password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit" 
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
            >
                Sign In
            </Button>
        </Box>
    );
};

export default SignInForm;