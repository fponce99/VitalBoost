import { useContext, useState } from "react";
import { IoSend } from "react-icons/io5";
import "../styles/CommentBox.css";
import { SearchContext } from "../utils/context/SearchContext";
import { API_ENDPOINTS } from '../config/api';

function CommentBox() {
  const { user, coach } = useContext(SearchContext)
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);

  const createReview = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.RESENIAS}/resenias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          autor: user.nombreCompleto,
          comentario: comment,
          entrenadorId: coach.id,
          calificacion: rate,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud POST");
      }

      await response.json();
      alert("Reseña creada");
    } catch (error) {
      console.error("Error al crear reserva:", error);
      throw error;
    }
  }

  return (
    <div className="CommentBoxContainer">
      <div className="TextAreaContainer">
        <textarea
          value={comment}
          className="TextAreaStyle"
          name="biografia"
          placeholder="Agrega un comentario"
          rows="3"
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="RateBox">
          <label>Calificacion</label>
          <input
            value={rate}
            type="number"
            className="RateInput"
            name="rate"
            onChange={(e) => {parseInt(setRate(e.target.value))}}
          />
        </div>
      </div>
      <button className="SendButton" onClick={createReview} type="button">
        <IoSend />
      </button>
    </div>
  );
}

export default CommentBox;
