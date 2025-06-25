import { CardDetail } from "./CardDetail";
import "../styles/Card.css";

function Card({ coach, onClick }) {
  const {
    nombreCompleto,
    profesion,
    especialidad,
    universidad,
    experiencia,
    costos,
  } = coach;

  const costo = costos?.[0]?.costo || "N/A";
  const avatar = "https://i.imgur.com/LDOO4Qs.jpg";

  return (
    <div className="CardContainer" onClick={onClick}>
      <div className="ProductImageContainer">
        <img src={avatar} alt={`${nombreCompleto}`} />
      </div>
      <CardDetail
        coach={coach}
        name={nombreCompleto}
        profesion={profesion}
        especialidad={especialidad}
        universidad={universidad}
        experiencia={experiencia}
        costo={costo}
      />
    </div>
  );
}

export { Card };
