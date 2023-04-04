import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { main_url, image_url,orig_image } from "./url";
import Spinner from "../loader/Loader";
import useFetch from "../hooks/useFetch";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Np = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const [display, setDisplay] = useState([]);
  const [error, setError] = useState();
  const NP_URL =
    main_url +
    `/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}` +
    "&page=1";

  const { isLoading, apiData } = useFetch(NP_URL);

  useEffect(() => {
    setDisplay(apiData.results ? apiData.results.slice(0, 10) : []);
  }, [apiData]);

  return (
    <div className='m-5 flex-center-col'>
      <h1 className='text'>Now Playing </h1>
 
        {isLoading ?(
          <Spinner />
      ) : (
          <AutoplaySlider
            className='w-24  h-96 m-2  '
        play={true}
        interval={3000}>
            {display.map((item) => (
              <div>
                <Link to={`/view/${item.id}`}>
                  <LazyLoadImage effect='blur' src={orig_image + item.backdrop_path} alt="" />
                </Link>
              </div>
            ))}
        </AutoplaySlider>
        )
        }
    
      </div>
  );
};

export default Np;
