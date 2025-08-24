import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAuth } from "../../contexts/authContext";

const SignUpForm: React.FC = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [message, setMessage] = useState("");  //response for user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("Submitted: ", email);
    try {
      await signUp(email, password); //registration through Supabase
      alert("Check your email for your registration!");
    } catch (err: any) {
      alert(`${err.message}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
