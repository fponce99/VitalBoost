import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Logo } from "../assets/Logo";
import { auth } from "../firebase";
import { SearchContext } from "../utils/context/SearchContext";
import { API_ENDPOINTS } from '../config/api';

import "../styles/Login.css";

async function getUserById(id) {
  const endpoints = [
    { url: `${API_ENDPOINTS.ENTRENADOR}/entrenadores/${id}`, rol: "entrenador" },
    { url: `${API_ENDPOINTS.CLIENTE}/clientes/${id}`, rol: "cliente" },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.url);
      if (response.ok) {
        const data = await response.json();
        return { ...data, rol: endpoint.rol };
      }
    } catch (error) {
      console.warn(`No se encontró en ${endpoint.rol}:`, error.message);
    }
  }

  console.error("Usuario no encontrado en ningún endpoint.");
  return null;
}

function Login() {
  const { setUser } = useContext(SearchContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const userData = await getUserById(user.uid);

      if (userData) {
        setUser(userData);
        alert("Inicio de sesión exitoso");
      } else {
        alert("No se encontró la información del usuario");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Credenciales incorrectas o error de red");
    }
  };

  return (
    <div className="ViewContainer">
      <div className="FormContainer">
        <Logo />
        <form className="LoginForm" onSubmit={handleLogin}>
          <InputField
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu correo"
          />
          <InputField
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
          />
          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
        </form>

        <div className="MoreOptions">
          <Link to="">¿Olvidaste tu contraseña?</Link>
          <Link to="/signup">Crear cuenta</Link>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, type, value, onChange, placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="form-control width-style-inputs"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default Login;
