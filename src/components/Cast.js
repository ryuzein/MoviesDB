import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { main_url, image_url } from "./url";
import Spinner from "../loader/Spinner";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'

const Cast = ({ id }) => {
  const VIEW_URL =
    main_url +
    `/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}` +
    "&language=en-US";
  const [display, setDisplay] = useState([]);
  const { isLoading, serverError, apiData } = useFetch(VIEW_URL);

  useEffect(() => {
    setDisplay(apiData.cast ? apiData.cast.splice(0, 15) : []);

  }, [apiData]);
  return (
    <div className='column'>
      {!isLoading && serverError ? (
        <span>Error in fetching data ...</span>
      ) : (
        <>
          <h1 className=" text">Casts</h1>
          <div className="home ">

            <Swiper watchSlidesProgress={true} breakpoints={{
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
               
                {display.map((item) => {
                  return (
                    <div >
                    {
                      isLoading ? (
                        <Spinner />
                      ) : (
                        <SwiperSlide>
                          <Link to={`/person/${item.id}`}>
                                <div className='card-div'
                                  data-aos="fade-right"
                                  data-aos-duration="700"
                                  data-aos-delay="200"
                                  data-aos-easing="ease-in-out">
                              <img className='card-img'
                                src={
                                  item.profile_path != null
                                    ? image_url + item.profile_path
                                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
                                }
                                alt=""
                              />
                              <div className="card-title">{item.name}</div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      )
                    }
                  </div>
                  )
               
                
                })}
            </Swiper>

          </div>
        </>
      )}
    </div>
  );
};

export default Cast;
