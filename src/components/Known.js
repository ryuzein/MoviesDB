import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { image_url, main_url } from "./url";
import useFetch from "../hooks/useFetch";
import Spinner from "../loader/Spinner";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Known = ({ id }) => {
  const KNOWN_URL =
    main_url +
    `/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}` +
    "&language=en-US";

  const [display, setDisplay] = useState([]);
  const { isLoading, apiData } = useFetch(KNOWN_URL);

  useEffect(() => {
    setDisplay(apiData.cast ? apiData.cast.slice(0, 16) : []);
  }, [apiData]);
  return (
    <div className="m-3">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text">Known for</h1>
          <div className="home">
            <Swiper
              watchSlidesProgress={true}
              breakpoints={{
                320: {
                  width: 320,
                  slidesPerView: 3,
                },
                640: {
                  width: 640,
                  slidesPerView: 5,
                },
                768: {
                  width: 768,
                  slidesPerView: 4,
                },
              }}
            >
              {display.map((item) => (
                <SwiperSlide>
                  <Link to={`/view/${item.id}`}>
                    <div
                      className="card-div"
                      data-aos="fade-right"
                      data-aos-duration="700"
                      data-aos-delay="200"
                      data-aos-easing="ease-in-out"
                    >
                      <LazyLoadImage
                        effect="blur"
                        className="card-img"
                        src={
                          item.poster_path
                            ? image_url + item.poster_path
                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
                        }
                        alt=""
                      />
                      <p className="card-title">{item.title}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default Known;
