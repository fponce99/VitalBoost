import { useContext } from "react";
import { SearchContext } from "../utils/context/SearchContext";
import "../styles/TotalAmount.css";

function TotalAmount() {
  const { searchValue, searchedCoaches, searchedReserves, user } = useContext(SearchContext);

  const rol = user?.rol;
  const totalResults = rol === "cliente" ? searchedCoaches.length : searchedReserves.length;

  return (
    <div className="ResultPreviewContainer">
      <h3>{totalResults} resultados para tu búsqueda</h3>
      {searchValue && <h3 className="SearchWord">: {searchValue}</h3>}
    </div>
  );
}

export { TotalAmount };