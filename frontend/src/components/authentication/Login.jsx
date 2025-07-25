import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Changed to identifier for flexibility
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages

  const navigate = useNavigate();

  const handleClear = () => {
    setIdentifier("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous messages
    setSuccess("");

    try {
      const response = await fetch(`http://localhost:8000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }), // Use identifier instead of email
      });

      if (response.ok) {
        const data = await response.json();
        const { authToken, user, role, loggedIn } = data;

        // Store data in localStorage after successful login
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", role);
        localStorage.setItem("loggedIn", loggedIn);

        setSuccess("Login successful!");
        // handleClear();

        // Delay navigation to ensure state updates are complete
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin", { replace: true });
            window.location.reload();
          } else {
            navigate("/", { replace: true });
            window.location.reload();
          }
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card p-4">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="identifier" className="form-label">
                  Email Address or Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  placeholder="Enter your email or username"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="btn btn-warning w-100">
                Login
              </button>
              {error && <p className="text-danger mt-3">{error}</p>}
              {success && <p className="text-success mt-3">{success}</p>}
            </form>
            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Sign up
                </Link>
              </p>
              <p>
                <Link to="/resetpassword" style={{ textDecoration: "none" }}>
                  Forgot Password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;