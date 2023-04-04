import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { main_url, image_url } from "./url";
import Spinner from "../loader/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Search = () => {
  const [display, setDisplay] = useState([]);
  const [total, setTotal] = useState([]);
  const [results, setResults] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { movie } = useParams();

  const SEARCH_URL =
    main_url +
    "/search/movie?" +
    `api_key=${process.env.REACT_APP_API_KEY}` +
    `&page=${page}` +
    `&query=${movie}`;

  const fetchResults = async () => {
    setLoading(true);
    await fetch(SEARCH_URL)
      .then((response) => response.json())
      .then((apiData) => {
        setTotal(apiData.total_pages);
        setDisplay(apiData.results);
        setResults(movie);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchResults();
  }, [movie, page]);

  return (
    <div>
      <p style={{ display: "none" }}>
        {(document.title = "MovieDB | " + movie)}
      </p>
      <div className="column">
        <p className="text">Results for: {results}</p>
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
          {loading ? (
            <Spinner />
          ) : display.length != 0 ? (
            display.map((item) => (
              <div
                className="card-div"
                data-aos="zoom-in"
                data-aos-duration="700"
                data-aos-delay="200"
                data-aos-easing="ease-in-out"
              >
                <Link to={`/view/${item.id}`}>
                  <div>
                    <LazyLoadImage
                      effect="blur"
                      className="card-img "
                      src={
                        item.poster_path
                          ? image_url + item.poster_path
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
                      }
                    />
                  </div>
                  <p className="card-title">{item.title}</p>
                </Link>
              </div>
            ))
          ) : (
            <h1>No data </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
