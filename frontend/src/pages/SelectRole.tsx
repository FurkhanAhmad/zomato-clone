import { useState } from "react";
import { useAppData } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../main";

type Role = "customer" | "rider" | "seller" | null;

function SelectRole() {
  const [role, setRole] = useState<Role>(null);
  const { setUser } = useAppData();
  const navigate = useNavigate();

  const roles: Role[] = ["customer", "rider", "seller"];

  const addRole = async () => {
    if (!role) return;
    try {
      const { data } = await axios.put(
        `${authService}/api/auth/add/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/", { replace: true });
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Choose your role
        </h2>

        <div className="space-y-3">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-full rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                role === r
                  ? "border-[#E23744] bg-[#E23744] text-white shadow-md"
                  : "border-gray-300 bg-white text-gray-700 hover:border-[#E23744] hover:bg-pink-50"
              }`}
            >
              Continue as {r}
            </button>
          ))}
        </div>

        {/* ✅ Single "Next" button – enabled only when a role is selected */}
        <button
          onClick={addRole}
          disabled={!role}
          className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200 ${
            role
              ? "bg-[#E23744] hover:bg-[#c92e3a] cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SelectRole;
