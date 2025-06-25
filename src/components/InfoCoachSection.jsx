import { useContext } from "react";
import { SearchContext } from "../utils/context/SearchContext";
import { Modal } from "./Modal";
import "../styles/InfoCoachSection.css";

function InfoCoachSection() {
  const { coach, isOpen, setIsOpen, modalidad, setModalidad } = useContext(SearchContext);

  if (!coach) return null;

  const handleSchedule = () => setIsOpen(true);

  const renderModalityOptions = () => {
    if (!coach.costos?.length) {
      return <h3>No hay modalidades disponibles</h3>;
    }

    if (coach.costos.length === 1) {
      const { modalidad, costo } = coach.costos[0];
      return (
        <h3>
          {modalidad}: ${costo}
        </h3>
      );
    }

    return coach.costos.map((cost, index) => (
      <div key={index} className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="modality"
          id={`modality-${index}`}
          value={cost.modalidad}
          checked={modalidad === cost.modalidad}
          onChange={(e) => setModalidad(e.target.value)}
        />
        <label className="form-check-label" htmlFor={`modality-${index}`}>
          {cost.modalidad}: ${cost.costo}
        </label>
      </div>
    ));
  };

  const renderPaymentMethods = () =>
    coach.costos?.map((cost, index) => (
      <div key={index} className="PaymentMethodsContainer">
        <h3>{cost.modalidad}</h3>
        <h3>${cost.costo}</h3>
        <h3>Transferencia, Tarjeta de crédito</h3>
      </div>
    ));

  return (
    <div className="InfoCoachSectionContainer">
      <div className="HeaderCoachInfo">
        <div className="ImageCoachContainer paddingCoachSectionInnerElements">
          <img src="https://i.imgur.com/LDOO4Qs.jpg" alt="Coach" />
        </div>

        <div className="MiniBoxStyle paddingCoachSectionInnerElements">
          <h1>{coach.nombreCompleto}</h1>
          <h4>{coach.profesion}</h4>
          <h4>Especialidad: {coach.especialidad}</h4>
          <h3>{coach.universidad}</h3>
          <h3>{coach.aniosExperiencia} años de experiencia</h3>
        </div>

        <div className="MiniBoxStyle paddingCoachSectionInnerElements">
          <form>
            <h2>Reserva tu cita</h2>
            {renderModalityOptions()}
            <button type="button" onClick={handleSchedule}>
              Agendar cita
            </button>
          </form>
        </div>
      </div>

      <div className="BodyCoachInfo">
        <div className="BodySubSectionContainer">
          <h2>Acerca de mí:</h2>
          <p>{coach.biografia}</p>
        </div>

        <div className="BodySubSectionContainer">
          <div className="AltInfoContainer">
            <h2>Valor y formas de pago</h2>
            {renderPaymentMethods()}
          </div>
          <div className="AltInfoContainer">
            <h2>Consultorio</h2>
            <h3>Km 45 viajando a la costa</h3>
            <h3>Guayaquil - Ecuador</h3>
            <h3>+593 999 923 323</h3>
          </div>
        </div>
      </div>

      {isOpen && <Modal />}
    </div>
  );

}

export default InfoCoachSection;
