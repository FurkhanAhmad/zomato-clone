


import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../main";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa6";
import { useAppData } from "../context/AppContext"; // <-- import context

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuth } = useAppData(); // <-- get setters from context

  const responseGoogle = async (authResult:  any ) => {
    setLoading(true);
    try {
      const result = await axios.post(`${authService}/api/auth/login`, {
        code: authResult["code"],
      });
      const { token, user } = result.data; // assume response contains user object

      localStorage.setItem("token", token);
      // ✅ Update global context with user data and authentication status
      toast.success(result.data.message || "Logged in successfully");
      setLoading(false);
       setUser(user);      // user should have a `role` property (or null)
      setIsAuth(true);
      navigate("/"); // now ProtectedRoute will see isAuth = true and render Home
    } catch (error) {
      console.error(error);
      toast.error("Problem with login");
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-3xl font-bold text-[#E23774]">Tomato</h1>
        <p className="text-center text-sm text-gray-500">Log in or signup to continue</p>
        <button
          onClick={googleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-3 hover:bg-gray-50"
        >
          <FaGoogle />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>
        <p className="text-center text-xs text-gray-500">
          By continuing, you agree with our{" "}
          <span className="text-[#E23774]">Terms of Service</span> and{" "}
          <span className="text-[#E23774]">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;