import { Link } from "react-router-dom";

import imagelist from "../../images/genreimg.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'


const ListGenre = ({name}) => {

  return (
    <div className='flex-center-row'>
        {imagelist.map((item) => (
          <div className='m-3 card-genre'>
          <Link to={`/genre/${item.id}/${item.name}`}>
              <LazyLoadImage effect='blur' className='w-36 h-24 rounded-lg' src={item.url} />
              <p>{item.name}</p>
          </Link>
          </div>
         
        ))}
        
       
      
        
      
    </div>
  );
};

export default ListGenre;
