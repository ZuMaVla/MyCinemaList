import AuthTabs from "../components/authTabs";

const AuthPage = () => {
  return (
    <div style={{ maxWidth: 400, margin: "3rem auto", textAlign: "center" }}>
      <h2>Authentication</h2>
      <p>Please sign in or create a new account to continue.</p>
      <AuthTabs />
    </div>
  );
};

export default AuthPage;