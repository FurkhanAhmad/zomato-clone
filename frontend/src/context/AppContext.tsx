


import axios from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "../main";
import type { AppContextType, LocationData, User } from "../types";

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProp {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProp) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // (optional location states – keep them if used elsewhere)
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState("Fetching Location....");

  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setIsAuth(false);
      return;
    }

    try {
      const { data } = await axios.get(`${authService}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      setIsAuth(true); // ✅ important: mark as authenticated
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token"); // clear invalid token
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);


 useEffect(() => {
  if (!navigator.geolocation) 
   return alert("Please Allow Location to continue");
   setLoadingLocation(true)
   

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(
          // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await res.json();
        setLocation({
          latitude,
          longitude,
          formattedAddress: data.display_name || "current location",
        });
        setCity(
          data.address.city ||
            data.address.town ||
            data.address.village ||
            "Your Location"
        );
      } catch (error) {
        // on error set a fallback location object
        setLocation({
          latitude,
          longitude,
          formattedAddress: "Current Location",
        });
        setCity("Failed to load");
      }
    },
    (err) => {
      console.error(err);
      setCity("Location permission denied");
    }
  );
}, []);
  return (
    <AppContext.Provider
      value={{
        isAuth,
        loading,
        setIsAuth,   // ✅ expose setter
        setLoading,  // ✅ expose setter (if needed)
        setUser,     // ✅ expose setter
        user,
        location,
        loadingLocation,
        city
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within AppProvider");
  }
  return context;
};


