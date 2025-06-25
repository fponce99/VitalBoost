import { Rating } from "./Rating";
import "../styles/CommentCard.css"

function CommentCard({author, comment, rating}) {
  return (
    <div className="CommentCardContainer">
      <h2>{author}</h2>
      <h3>{comment}</h3>
      <Rating stars={rating} />
    </div>
  );
}

export default CommentCard;
