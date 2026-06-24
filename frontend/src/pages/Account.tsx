import { useNavigate } from "react-router-dom"
import { useAppData } from "../context/AppContext"
import toast from "react-hot-toast"
import { BiLogOut, BiMapPin, BiPackage } from "react-icons/bi"


const Account = () => {
    const {user,setUser,setIsAuth}=useAppData()
    const firstLetter=user?.name.charAt(0).toUpperCase()
    const navigate=useNavigate()
    
    const logoutHandler=()=>{
      localStorage.setItem("token","");
      setUser(null);
      setIsAuth(false);
      navigate("/login");
      toast.success("logout Success");
    }
  return (
    // <div className="min-h-screen bg-gray-50 px-4 py-6">
    //   <div className="mx-auto max-w-md rounded-lg bg-white shadow-sm">
    //   <div className="flex items-center gap-4 border-b p-5">
    //     <div className="flex h-14 w-14 items-center justify-center rounded-full
    //     bg-red-500 text-xl font-semibold text-white">
    //       {firstLetter}
    //     </div>
    //     <div>
    //       <h2 className="text-lg font-semibold">{user?.name}</h2>
    //       <p className="text-sm text-gray-500">{user?.email}</p>
    //     </div>
    //   </div>
    //   <div className="divide-y">
    //     <div className="flex cursor-pointer items-center gap-4 hover:bg-gray-50" 
    //    onClick={()=>navigate("/orders")}>
    //     <BiPackage className="h-5 w-5 text-red-500"/>
    //     <span className="font-medium">Your Orders</span>
    //    </div>
    //      <div className="flex cursor-pointer items-center gap-4 hover:bg-gray-50" 
    //    onClick={()=>navigate("/address")}>
    //     <BiMapPin className="h-5 w-5 text-red-500"/>
    //     <span className="font-medium">Addreses</span>
    //    </div>
    //      <div className="flex cursor-pointer items-center gap-4 hover:bg-gray-50" 
    //    onClick={logoutHandler}>
    //     <BiLogOut className="h-5 w-5 text-red-500"/>
    //     <span className="font-medium">Logout</span>
    //    </div>
    //   </div>
    // </div>
    // </div>


    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
  <div className="mx-auto max-w-lg rounded-2xl bg-white shadow-xl ring-1 ring-black/5 transition-shadow hover:shadow-2xl">
    {/* Header */}
    <div className="flex items-center gap-5 border-b border-gray-100 px-6 py-5">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-2xl font-semibold text-white shadow-md ring-2 ring-red-500/20">
        {firstLetter}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="truncate text-xl font-bold text-gray-900">{user?.name}</h2>
        <p className="truncate text-sm text-gray-500">{user?.email}</p>
      </div>
    </div>

    {/* Menu items */}
    <div className="divide-y divide-gray-100">
      <div
        className="flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-red-50/70"
        onClick={() => navigate("/orders")}
      >
        <BiPackage className="h-6 w-6 text-red-500" />
        <span className="text-base font-medium text-gray-800">Your Orders</span>
        <span className="ml-auto text-sm text-gray-400">→</span>
      </div>

      <div
        className="flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-red-50/70"
        onClick={() => navigate("/address")}
      >
        <BiMapPin className="h-6 w-6 text-red-500" />
        <span className="text-base font-medium text-gray-800">Addresses</span>
        <span className="ml-auto text-sm text-gray-400">→</span>
      </div>

      <div
        className="flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-red-50/70"
        onClick={logoutHandler}
      >
        <BiLogOut className="h-6 w-6 text-red-500" />
        <span className="text-base font-medium text-red-600">Logout</span>
        <span className="ml-auto text-sm text-gray-400">→</span>
      </div>
    </div>
  </div>
</div>
  )
}
export default Account
