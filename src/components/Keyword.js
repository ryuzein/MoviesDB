import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from '../loader/Loader'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Keyword = ({ id }) => {
  const [display, setDisplay] = useState([]);
  const MAIN = "https://api.themoviedb.org/3";
  const URL =
    MAIN +
    `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}` +
    `&with_keywords=${id}&language=en-US`;
  const IMG_URL = "https://image.tmdb.org/t/p/w300";

  const { isLoading, apiData } = useFetch(URL);
  useEffect(() => {
    setDisplay(apiData.results ? apiData.results.slice(0, 14) : []);
  }, [apiData]);
  return (
    <div className='column'>
    <h1 className='text'>Similar Movies</h1>
      <div className="home">
        <Swiper  watchSlidesProgress={true}  breakpoints={{
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
            }}>
          {display.map((item) => (
            
            <SwiperSlide>{
              isLoading?(
              <Loader />
            ) : (
              <div className="card-div mb-10"   data-aos="fade-right"
              data-aos-duration="700"
              data-aos-delay="200"
              data-aos-easing="ease-in-out">
                <Link to={`/view/${item.id}`}>
                      <LazyLoadImage
                        effect="blur"
                    className="card-img"
                    src={IMG_URL + item.poster_path}
                    alt={item.title}
                      />
                      <p className='card-title'>{item.title}</p>
                </Link>
              </div>
              )}
            </SwiperSlide>
              ))}
          </Swiper>
      </div>
      </div>
  );
};

export default Keyword;
