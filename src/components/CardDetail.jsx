import { useContext } from "react";
import { SearchContext } from "../utils/context/SearchContext";
import "../styles/CardDetail.css";

function CardDetail({ coach, name, profesion, especialidad, universidad, experiencia, costo }) {
  const { setIsOpen, setCoach } = useContext(SearchContext);

  const handleSchedule = (e) => {
    e.stopPropagation();
    setCoach(coach);
    setIsOpen(true);
  };

  return (
    <div className="DetailsCardContainer">
      <div>
        <h3>{name}</h3>
        <h4>{profesion} - {especialidad}</h4>
        <h3>{universidad}</h3>
        <h3>{experiencia} años de experiencia</h3>
        <h3>${costo} la consulta</h3>
      </div>
      <div className="ButtonContianer">
        <button onClick={handleSchedule}>Consultar Disponibilidad</button>
      </div>
    </div>
  );
}

export { CardDetail };
