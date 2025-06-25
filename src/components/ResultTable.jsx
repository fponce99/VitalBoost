import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../utils/context/SearchContext";
import { Card } from "./Card";
import "../styles/ResultTable.css";

function ResultTable() {
  const { searchedCoaches, isLoading, setCoach, setComments } = useContext(SearchContext);
  const navigate = useNavigate();

  const getReseniasByCoach = async (id) => {
    try {
      const res = await fetch(`http://localhost:8083/resenias/entrenador/${id}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data)
      }
    } catch (err) {
      console.error(`Error cargando cliente ${id}:`, err);
    }
  };

  const handleInfoCoach = async (coach) => {
    await getReseniasByCoach(coach.id)
    setCoach(coach);
    navigate("/details");
  };

  return (
    <div className="ResultContainer">
      <h2>Resultados:</h2>
      <div className="CardResultsContainer">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          searchedCoaches.map((coach) => (
            <Card
              key={coach.id} // Requiere que cada coach tenga un ID único
              coach={coach}
              onClick={() => handleInfoCoach(coach)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export { ResultTable };
