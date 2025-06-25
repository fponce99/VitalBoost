import { useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { SearchContext } from "../utils/context/SearchContext";
import "../styles/Modal.css";

const AVAILABILITY_TIMES = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function nextTime(startTime) {
  const [h, m] = startTime.split(":").map(Number);
  return `${String(h + 1).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function Modal() {
  const { user, setIsOpen, modalidad, coach } = useContext(SearchContext);

  const [form, setForm] = useState({
    email: "",
    name: "",
    passport: "",
    dateSession: "",
    timeSession: "",
  });

  const currentDate = new Date().toISOString().split("T")[0];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleCloseModal = () => setIsOpen(false);

  const getReserveBody = () => {
    const [year, month, day] = form.dateSession.split("-").map(Number);
    const [hours, minutes] = form.timeSession.split(":").map(Number);

    const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const formattedDateTime = utcDate.toISOString();

    const reserva = {
      modalidad,
      fechaReserva: formattedDateTime,
      clienteId: user.id,
      entrenadorId: coach.id,
    };

    return reserva;
  };

  const makeReservation = async () => {
    const reserveBody = getReserveBody();
    try {
      const response = await fetch("http://localhost:8082/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reserveBody),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud POST");
      }

      await response.json();
      alert("Reserva creado");
    } catch (error) {
      console.error("Error al crear reserva:", error);
      throw error;
    }
  };

  return (
    <div className="ModalContainer">
      <div className="ContentModalContainer">
        <div className="ProductImageContainer">
          <h2>Agendar cita</h2>
          <AiOutlineCloseCircle className="closeModal" onClick={handleCloseModal} />
        </div>
        <div className="DetailsModalContainer">
          <form className="LoginForm">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={form.email}
                className="form-control width-style-inputs"
                id="email"
                placeholder="Enter email"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                value={form.name}
                className="form-control width-style-inputs"
                id="name"
                placeholder="Nombre"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passport">Cédula</label>
              <input
                value={form.passport}
                className="form-control width-style-inputs"
                id="passport"
                placeholder="Cédula"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-date-time">
              <div className="form-group">
                <label htmlFor="dateSession">Fecha</label>
                <input
                  type="date"
                  id="dateSession"
                  value={form.dateSession}
                  className="form-control"
                  onChange={handleInputChange}
                  min={currentDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="timeSession">Hora</label>
                <select
                  id="timeSession"
                  value={form.timeSession}
                  className="form-control"
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona un horario</option>
                  {AVAILABILITY_TIMES.map((time) => (
                    <option key={time} value={time}>
                      {time} - {nextTime(time)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={makeReservation}
              className="btn btn-primary"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export { Modal };
