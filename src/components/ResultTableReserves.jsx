import { useContext, useState, useEffect, useCallback } from "react";
import { SearchContext } from "../utils/context/SearchContext";
import "../styles/ResultTableReserves.css";

function ResultTableReserves() {
  const { searchedReserves, isLoading } = useContext(SearchContext);
  const [clientNames, setClientNames] = useState({});

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.toLocaleDateString("es-ES", { day: "2-digit" });
    const month = date.toLocaleDateString("es-ES", { month: "long" });
    const year = date.getFullYear();
    const hour = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });
    return `${day} - ${month} - ${year} :: ${hour}`;
  };

  const fetchClientNames = useCallback(async () => {
    const namesMap = {};

    await Promise.all(
      searchedReserves.map(async ({ clienteId }) => {
        if (!namesMap[clienteId]) {
          try {
            const res = await fetch(
              `http://localhost:8081/clientes/${clienteId}`
            );
            if (res.ok) {
              const data = await res.json();
              namesMap[clienteId] = data.nombreCompleto;
            } else {
              namesMap[clienteId] = "Desconocido";
            }
          } catch (err) {
            console.error(`Error cargando cliente ${clienteId}:`, err);
            namesMap[clienteId] = "Error";
          }
        }
      })
    );

    setClientNames(namesMap);
  }, [searchedReserves]);

  useEffect(() => {
    if (searchedReserves.length > 0) {
      fetchClientNames();
    }
  }, [searchedReserves, fetchClientNames]);

  return (
    <div className="ResultTableReservesContainer">
      <h2>Resultados:</h2>
      {isLoading ? (
        <span className="loader"></span>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="firstColumn">#</th>
              <th className="secondColumn">Cliente</th>
              <th className="thirdColumn">Modalidad</th>
              <th className="fourthColumn">Estado</th>
              <th className="fifthColumn">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {searchedReserves.map((reserve, index) => (
              <tr key={reserve.id || index}>
                <th className="firstColumn" scope="row">{index + 1}</th>
                <td className="secondColumn">{clientNames[reserve.clienteId] || "Cargando..."}</td>
                <td className="thirdColumn">{reserve.modalidad}</td>
                <td className="fourthColumn">
                  <span className={`estado-label ${reserve.estado.toLowerCase()}`}>{reserve.estado}</span>
                </td>
                <td className="fifthColumn">{formatDate(reserve.fechaReserva)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ResultTableReserves;
