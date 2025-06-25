import { useLocation } from "react-router-dom";
import { TotalAmount } from "./TotalAmount";
import { SortFilter } from "./SortFilter";
import "../styles/SubBar.css";

function SubBar() {
  const { pathname } = useLocation();
  const isMainView = pathname === "/";

  return isMainView ? <SearchSubBar /> : <DetailSubBar />;
}

function SearchSubBar() {
  return (
    <div className="SubBarContainer BorderStyleForSubBar">
      <TotalAmount />
      <SortFilter />
    </div>
  );
}

function DetailSubBar() {
  return (
    <div className="SubBarContainer DetailVersionStyle BorderStyleForSubBar">
      <p>Agenda tu cita y empieza un cambio en tu vida.</p>
    </div>
  );
}

export { SubBar };
