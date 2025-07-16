import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { SearchContext } from "../utils/context/SearchContext";
import { API_ENDPOINTS } from '../config/api';
import "../styles/SignUp.css";

const initialFormState = {
  nombreCompleto: "",
  email: "",
  password: "",
  confirmPassword: "",
  isCoach: false,
  profesion: "",
  especialidad: "",
  universidad: "",
  aniosExperiencia: 0,
  onSiteCost: 0,
  onlineCost: 0,
  biografia: "",
  datosConsultorio: "",
};

const CoachForm = ({ formData, handleChange }) => (
  <>
    <div className="CoachForm">
      <div className="userSection">
        {["profesion", "universidad", "onSiteCost"].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field === "onSiteCost" ? "Costo cita presencial" : capitalize(field)}</label>
            <input
              value={formData[field]}
              type="text"
              name={field}
              className="form-control width-style-inputs"
              placeholder={`Ingresa ${field}`}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <div className="userSection">
        {["especialidad", "aniosExperiencia", "onlineCost"].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field === "onlineCost" ? "Costo cita online (opcional)" : capitalize(field)}</label>
            <input
              value={formData[field]}
              type={field === "aniosExperiencia" ? "number" : "text"}
              name={field}
              className="form-control width-style-inputs"
              placeholder={`Ingresa ${field}`}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="userSection">
      <label htmlFor="biografia">Acerca de mí</label>
      <textarea
        value={formData.biografia}
        name="biografia"
        className="form-control"
        placeholder="Introduce yourself"
        rows="3"
        onChange={handleChange}
      />
    </div>
  </>
);


function Signup() {
  const { setUser } = useContext(SearchContext);
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validatePasswordMatch = () => {
    const { password, confirmPassword } = formData;
    const match = password === confirmPassword;
    if (!match) {
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      alert("Las contraseñas no coinciden");
    }
    return match;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordMatch()) return;

    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const newUser = {
        id: user.uid,
        email: formData.email,
        nombreCompleto: formData.nombreCompleto,
        rol: formData.isCoach ? "entrenador" : "cliente",
      };

      if (formData.isCoach) {
        Object.assign(newUser, {
          profesion: formData.profesion,
          especialidad: formData.especialidad,
          universidad: formData.universidad,
          aniosExperiencia: parseInt(formData.aniosExperiencia),
          biografia: formData.biografia,
          datosConsultorio: "Km 45 viajando a la costa",
          costos: [
            { modalidad: "presencial", costo: parseFloat(formData.onSiteCost) },
            ...(parseFloat(formData.onlineCost) > 0
              ? [{ modalidad: "virtual", costo: parseFloat(formData.onlineCost) }]
              : []),
          ],
        });
      }

      await postUserToBackend(newUser, formData.isCoach);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error al registrarse:", error);
      alert("Error al crear cuenta");
    }
  };

  const postUserToBackend = async (userData, isCoach) => {
    const endpoint = isCoach ? `${API_ENDPOINTS.ENTRENADOR}/entrenadores` : `${API_ENDPOINTS.CLIENTE}/clientes`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }

    const data = await response.json();
    setUser(data);
  };

  return (
    <div className="ViewContainer">
      <div className="FormContainer">
        <form onSubmit={handleSubmit} className="SignUpForm">
          <div className="UserForm">
            <div className="userSection">
              <div className="upload-container">
                <input
                  type="file"
                  accept="image/*"
                  className="file-input"
                  onChange={(e) => console.log(e.target.files[0])}
                />
                <label className="upload-label">👤</label>
              </div>

              <div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="isCoach"
                    checked={formData.isCoach}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isCoach">
                    Perfil de entrenador
                  </label>
                </div>
                <p className="CoachCheckBox">
                  Habilita esta opción si deseas ofrecer servicios profesionales.
                </p>
              </div>
            </div>

            <div className="userSection">
              {["nombreCompleto", "email", "password", "confirmPassword"].map((field) => (
                <div className="form-group" key={field}>
                  <label htmlFor={field}>{labels[field]}</label>
                  <input
                    type={field.toLowerCase().includes("password") ? "password" : "text"}
                    name={field}
                    value={formData[field]}
                    className="form-control width-style-inputs"
                    placeholder={`Ingresa ${labels[field].toLowerCase()}`}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {formData.isCoach && <CoachForm formData={formData} handleChange={handleChange} />}

          <button type="submit">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
}

const labels = {
  nombreCompleto: "Nombre completo",
  email: "Correo electrónico",
  password: "Contraseña",
  confirmPassword: "Confirmar contraseña",
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default Signup;
