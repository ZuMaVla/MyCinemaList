import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

interface ChangePasswordFormProps {
  userEmail: string;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ userEmail }) => {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await updatePassword(password);
      alert("The password was changed successfully. Now you can log in.");
      navigate("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Email"
        type="email"
        value={userEmail}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="New password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Confirm password"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePasswordForm;