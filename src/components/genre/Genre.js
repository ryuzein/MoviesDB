import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { image_url, main_url } from "../url";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Spinner from "../../loader/Spinner";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { Lazy } from "swiper";
const Genre = () => {
  const [display, setDisplay] = useState([]);
  const { name , genrename } = useParams();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const GENRE_URL =
    main_url +
    `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}` +
    `&with_genres=${name}+&page=${page}`;

  const { isLoading, apiData } = useFetch(GENRE_URL);
  useEffect(() => {
    
    setDisplay(apiData.results ? apiData.results.slice(0, 20) : []);
    setTotal(apiData.total_pages)
    
    document.title = `MovieDB | ${genrename}`;
  }, [isLoading]);

  return (
    <div className='column'>
      <p className="text-center">{genrename}</p>
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
      {isLoading ? (
        <Spinner/>
      )
        : (
        <div className="home">
        {display.map((item) =>
          <div className="card-div"
          data-aos="zoom-in"
          data-aos-duration="700"
          data-aos-delay="200"
          data-aos-easing="ease-in-out"
          >
            <Link to={`/view/${item.id}`}>
              <LazyLoadImage effect='blur' className='card-img' src={image_url + item.poster_path} alt={item.title} />
              <p className='card-title '>{item.title}</p>
            </Link>
          </div>
        )}
        </div>
        )
      }
    </div>
  );
};

export default Genre;
