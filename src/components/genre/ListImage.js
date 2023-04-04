import React from "react";
import imagelist from "../../images/genreimg.js";
import ListGenre from "./ListGenre";
const ListImage = () => {
  return (
    <div>
      {imagelist.map((item) => {
        return <ListGenre name={item.url} />;
      })}
    </div>
  );
};

export default ListImage;
