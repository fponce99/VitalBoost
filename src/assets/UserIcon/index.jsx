import { useContext, useRef, useEffect } from "react";
import { SearchContext } from "../../utils/context/SearchContext";
import "./UserIcon.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function UserIcon() {
  const {showTooltip, setShowTooltip, setUser} = useContext(SearchContext);
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  const HandleLogOut = () => {
    signOut(auth);
    setUser(null);
    alert("Sesion cerrada");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profileIconContainer">
      <img ref={buttonRef} src="src/assets/UserIcon/usuario.png" onClick={() => setShowTooltip((prev) => !prev)} />
      {showTooltip && (
        <div
          className="menuTooltip"
          ref={tooltipRef}
        >
          <button className="tooltipOption">Cuenta</button>
          <button className="tooltipOption">Reservas</button>
          <button className="tooltipOption" onClick={HandleLogOut}>Cerrar sesion</button>
        </div>
      )}
    </div>
  );
}

export { UserIcon };
