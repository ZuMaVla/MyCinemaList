import { useState } from "react";
import Box from "@mui/material/Box";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Tab from "@mui/material/Tab";
import SignInForm from "../forms/signInForm";
import SignUpForm from "../forms/signUpForm";
import ResetPasswordForm from "../forms/resetPasswordForm";

const AuthTabs: React.FC = () => {
  const [value, setValue] = useState("1");
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="auth tabs">
          <Tab label="Sign In" value="1" />
          <Tab label="Sign Up" value="2" />
          <Tab label="Reset Password" value="3" />
        </TabList>
      </Box>

      <TabPanel value="1">
        <SignInForm />
      </TabPanel>
      <TabPanel value="2">
        <SignUpForm />
      </TabPanel>
      <TabPanel value="3">
        <ResetPasswordForm />
      </TabPanel>
    </TabContext>
  );
};

export default AuthTabs;
