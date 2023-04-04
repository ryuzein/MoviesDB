import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { image_url, main_url } from "./url";
import Spinner from "../loader/Spinner";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Top = () => {
  const [display, setDisplay] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const TOP_URL =
    main_url +
    `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}` +
    `&page=${page}`;

  const { isLoading, apiData } = useFetch(TOP_URL);

  useEffect(() => {
    setTotal(apiData.total_pages);
    setDisplay(apiData.results ? apiData.results.slice(0, 20) : []);
    document.title = "MovieDB | Top Rated";
  }, [apiData, page]);

  return (
    <div className="column">
      <h1 className="text">Top Rated</h1>
      <div className="flex-center-row">
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          <IoIosArrowDropleftCircle className="prev-next" />
        </button>
        <p>
          {page}/{total}
        </p>
        <button
          onClick={() => {
            if (page < total) {
              setPage(page + 1);
            }
          }}
        >
          <IoIosArrowDroprightCircle className="prev-next" />
        </button>
      </div>
      <div className="home">
        {isLoading ? (
          <Spinner />
        ) : (
          display.map((item) => (
            <div class="card-div">
              <Link exact to={`/view/${item.id}`}>
                <LazyLoadImage
                  effect="blur"
                  className="card-img"
                  src={image_url + item.poster_path}
                  alt=""
                />
                <p className="card-title">{item.title}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Top;
