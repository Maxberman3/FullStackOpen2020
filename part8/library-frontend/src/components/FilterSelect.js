import React, {useEffect} from "react";
import {useLazyQuery} from "@apollo/client";
import {ME} from "../queries";

const FilterSelect = ({genres, setFilter, token}) => {
  const [getMe, result] = useLazyQuery(ME);
  useEffect(() => {
    if (result.data) {
      setFilter(result.data.me.favoriteGenre);
    }
  }, [result, setFilter]);
  const tokenCheck = () => {
    if (token) {
      return <button onClick={getMe}>Recommended</button>;
    }
  };
  return (
    <div>
      {genres.map((genre, idx) => {
        return (
          <button key={idx} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        );
      })}
      <button onClick={() => setFilter(null)}>All Genres</button>
      {tokenCheck()}
    </div>
  );
};

export default FilterSelect;
