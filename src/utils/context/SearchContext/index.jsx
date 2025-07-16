import { useState, useEffect, createContext } from "react";
import { API_ENDPOINTS } from '../../../config/api';

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [user, setUser] = useState(null);
  const [coach, setCoach] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [modalidad, setModalidad] = useState("presencial");
  const [showTooltip, setShowTooltip] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [reserves, setReserves] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchData = async (url, fallback = []) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error en la petición a ${url}`);
      const data = await response.json();
      return Array.isArray(data) ? data : fallback;
    } catch (error) {
      console.error(error);
      return fallback;
    }
  };

  const normalizeText = (text = "") => text.toLowerCase();

  const filterBySearch = (dataList, listName) => {
    const searchText = normalizeText(searchValue);

    return dataList.filter((item) => {
      if (listName === "clientes") {
        const profesion = normalizeText(item.profesion || "");
        const nombre = normalizeText(item.nombreCompleto || "");
        return profesion.includes(searchText) || nombre.includes(searchText);
      }

      if (listName === "reservas") {
        const modalidad = normalizeText(item.modalidad || "");
        const estado = normalizeText(item.estado || "");
        return modalidad.includes(searchText) || estado.includes(searchText);
      }

      // Si no coincide ningún listName, no filtra nada
      return false;
    });
  };

  useEffect(() => {
    const loadInitialData = async () => {
      if (!user) return;
      const id = user.id;
      const rol = user.rol;
      setIsLoading(true);
      const [fetchedClients, fetchedReserves] = await Promise.all([
        fetchData(`${API_ENDPOINTS.ENTRENADOR}/entrenadores`),
        fetchData(`${API_ENDPOINTS.RESERVAS}/reservas/${rol}/${id}`),
      ]);

      setClients(fetchedClients);
      setReserves(fetchedReserves);
      setIsLoading(false);
    };

    loadInitialData();
  }, [user]);

  const searchedCoaches = filterBySearch(clients, "clientes");
  const searchedReserves = filterBySearch(reserves, "reservas");

  return (
    <SearchContext.Provider
      value={{
        user,
        setUser,
        modalidad,
        setModalidad,
        searchValue,
        setSearchValue,
        searchedCoaches,
        searchedReserves,
        isLoading,
        showTooltip,
        setShowTooltip,
        coach,
        setCoach,
        comments,
        setComments,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
