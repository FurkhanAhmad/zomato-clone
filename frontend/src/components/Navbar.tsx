
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { useAppData } from "../context/AppContext"
import { useEffect, useState } from "react"
import { CgShoppingCart } from "react-icons/cg"
import { BiMapPin, BiSearch } from "react-icons/bi"

const Navbar = () => {
    const {isAuth,city}=useAppData()
    const curLocation=useLocation()
    const isHomePage=curLocation.pathname==="/"
    const [searchParams, setsearchParams] = useSearchParams()
    const [search,setSearch]=useState(searchParams.get("search") || "");
    useEffect(()=>{
        const timer=setTimeout(()=>{
            if(search){
                setsearchParams({search})
            } else {
                setsearchParams({})
            }
        },400)
        return ()=>clearTimeout(timer);
    },[search])
  return (
    <div className="w-full bg-white shadow-sm">
    <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
  {/* Logo as image */}
  <Link to="/" className="flex items-center text-2xl font-bold text-[#E23744]">
    Tomato
  </Link>

  <div className="flex items-center gap-4">
    <Link to="/cart" className="relative">
      <CgShoppingCart className="h-6 w-6 text-[#E23744]" />
      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#E23744] text-xs font-semibold text-white">
        0
      </span>
    </Link>
    {isAuth ? (
      <Link to="/account" className="font-medium text-[#E23744]">Account</Link>
    ) : (
      <Link to="/login" className="font-medium text-[#E23744]">Login</Link>
    )}
  </div>
</div>
        {/* search bar */}

        {
            isHomePage && <div className="border-t px-4 py-3 " >
                <div className="mx-auto flex max-w-7xl items-center rounded-lg border shadow-sm">
                    <div className="flex items-center gap-2 px-3 border-r text-gray-700">
                        <BiMapPin className="h-4 w-4 text-[#E23744]"/>
                        <span className="text-sm truncate max-w-35">{city} </span> 
                    </div>
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <BiSearch className="h-4 w-4 text-gray-400"/>
                        <input
                        type="text"
                        placeholder="Search for resturant"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        className="w-full py-2 text-sm ouline-none"
                        />
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Navbar

