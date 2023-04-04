import { useState, useEffect } from "react";
import { main_url } from "./url";
import useFetch from "../hooks/useFetch";
import Spinner from "../loader/Spinner";
const Videos = ({ id }) => {
  const VID_URL =
    main_url +
    `/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}` +
    "&language=en-US";

  const [display, setDisplay] = useState([]);
  const { isLoading, serverError, apiData } = useFetch(VID_URL);

  useEffect(() => {
    setDisplay(apiData.results ? apiData.results.slice(0, 3) : []);
  }, [apiData]);

  return (
    <div className="m-3">
      <h1 className="text">Trailer</h1>
      <div className="flex-center-row p-3">
        {isLoading ? (
          <Spinner />
        ) : (
          display.map((item) => (
            <iframe
              className="m-5"
              width="320"
              height="250"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          ))
        )}
      </div>
    </div>
  );
};

export default Videos;
