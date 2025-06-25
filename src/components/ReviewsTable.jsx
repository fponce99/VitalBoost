import { useContext } from "react";
import { SearchContext } from "../utils/context/SearchContext";
import { SortFilter } from "./SortFilter";
import "../styles/ReviewsTable.css"
import CommentCard from "./CommentCard";
import CommentBox from "./CommentBox";

function ReviewsTable () {
    const { comments } = useContext(SearchContext);
    return(
        <div className="ReviewsTableContainer">
          <h2>Reseñas</h2>
          <div className="SubBarContainer">
            <h3>Total: {comments.length}</h3>
            <SortFilter />
          </div>
          <div className="CommentListContainer">
            {comments.map((comment, index) => {
              return(
              <CommentCard
              key={`${index}-${comment.calificacion}`}
              author={comment.autor}
              comment={comment.comentario}
              rating={comment.calificacion}
              />)
            })}
          </div>
          <CommentBox />
        </div>
    )
}

export default ReviewsTable;