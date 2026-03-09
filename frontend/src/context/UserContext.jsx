// import { jwtDecode } from "jwt-decode";
// import { Children, createContext, useEffect, useState } from "react";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//         console.log(user);
//       } catch (error) {
//         console.error("Invalid token:", error);
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          console.warn("Session expired. Please log in again.");
          localStorage.removeItem("token");
          setUser(null);
          window.location.href = "/login"; // redirect user to login
        } else {
          setUser(decoded);
          console.log(user);
        }
      } catch (error) {
        console.error("Invalid or malformed token:", error.message);
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/login";
      }
    }
  }, []);

  useEffect(() => {
    if (user) console.log("decoded user : ", user);
  }, [user]);
  // Optional: watch token changes (if stored later during login)
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      if (!newToken) setUser(null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
