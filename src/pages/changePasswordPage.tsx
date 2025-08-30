import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../db/supabase";
import ChangePasswordForm from "../components/forms/changePasswordForm";
import Spinner from "../components/spinner";

const ChangePasswordPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Catch the password recovery event
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setEmail(session.user.email ?? null);
        setLoading(false);
      }
    });

    // If the user landed here but there is no token => redirect to login
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setLoading(false);
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto", textAlign: "center" }}>
      <h2>Changing password</h2>
      <p>Please enter a new password.</p>
      {email ? (
        <ChangePasswordForm userEmail={email} />
      ) : (
        <p style={{ color: "red" }}>Invalid or expired link.</p>
      )}
    </div>
  );
};

export default ChangePasswordPage;