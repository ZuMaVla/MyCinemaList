import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { signIn, signUp } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegister) {
      await signUp(email, password);
      alert("Check your email to confirm your registration!");
    } else {
      await signIn(email, password);
      navigate("/");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "2rem auto" }}>
      <h2>{isRegister ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          {isRegister ? "Register" : "Log In"}
        </button>
      </form>
      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Log in" : "Sign up"}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;