import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";
import { SearchContext } from "../utils/context/SearchContext";

import MainView from "./MainView";
import MainViewCoach from "./MainViewCoach";
import Login from "./Login";
import Signup from "./Signup";
import CoachDetails from "./CoachDetails";

function App() {
  const { user, setUser } = useContext(SearchContext);

  async function getUserById(id) {
    const endpoints = [
      { url: `http://localhost:8080/entrenadores/${id}`, rol: "entrenador" },
      { url: `http://localhost:8081/clientes/${id}`, rol: "cliente" },
    ];

    for (const { url, rol } of endpoints) {
      try {
        const response = await fetch(url);

        if (response.status === 404) {
          console.warn(`Usuario no encontrado como ${rol}.`);
          continue;
        }

        if (!response.ok) {
          throw new Error(
            `Error ${response.status} al buscar usuario en ${rol}`
          );
        }

        const data = await response.json();
        return { ...data, rol };
      } catch (error) {
        console.warn(`Error al buscar en ${rol}: ${error.message}`);
      }
    }

    return null;
  }

  useEffect(() => {
    const fetchUserData = async (firebaseUser) => {
      try {
        const data = await getUserById(firebaseUser.uid);

        if (!data) throw new Error("No se pudo obtener el usuario");

        setUser(data);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      if (!user) {
        fetchUserData(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, [user, setUser]);

  const renderHomeByRole = () => {
    if (!user) return <Navigate to="/login" />;
    return user.rol === "entrenador" ? <MainViewCoach /> : <MainView />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={renderHomeByRole()} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/details"
          element={user ? <CoachDetails /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
