import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { main_url, image_url } from "./url";
import Spinner from "../loader/Loader";
import useFetch from "../hooks/useFetch";
const Upcoming = () => {
  const [display, setDisplay] = useState([]);
  const [error, setError] = useState();
  const UPCOMING_URL =
    main_url +
    `/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}` +
    "&page=1";

  const { isLoading, serverError, apiData } = useFetch(UPCOMING_URL);
  useEffect(() => {
    setDisplay(apiData.results ? apiData.results : []);
  }, [isLoading]);
  return (
    <>
      <p className="text">Upcoming</p>

      <div className="home">
        {isLoading ? (
          <Spinner />
        ) : (
          display.map((item) => (
            <div className="container">
              <Link to={`/view/${item.id}`}>
                <img src={image_url + item.poster_path} alt="" />
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Upcoming;
