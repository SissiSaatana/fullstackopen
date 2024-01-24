import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useNavigate } from "react-router-dom";

const FavoriteGenre = ({ user }) => {
  const navigate = useNavigate();
  if (!user) navigate("/");

  const booksInFavoriteGenre = useQuery(ALL_BOOKS, {
    variables: { genre: user.favoriteGenre },
  });

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {user.favoriteGenre}</p>
    </div>
  );
};

export default FavoriteGenre;
