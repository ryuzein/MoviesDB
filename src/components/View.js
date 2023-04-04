import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { image_url, main_url, orig_image } from "./url";
import useFetch from "../hooks/useFetch";
import Cast from "./Cast";
import Videos from "./Videos";
import GetKeyword from "./GetKeyword";
import CoverLoader from "../loader/CoverLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AiFillStar } from "react-icons/ai";
const View = () => {
  const { id } = useParams();
  const [display, setDisplay] = useState([]);

  const VIEW_URL =
    main_url +
    `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}` +
    "&language=en-US";

  const { isLoading, apiData } = useFetch(VIEW_URL);
  useEffect(() => {
    setDisplay(apiData);
  }, [apiData]);
  return (
    <div>
      <p style={{ display: "none" }}>
        {(document.title = "MovieDB | " + display.original_title)}
      </p>
      {isLoading ? (
        <CoverLoader />
      ) : (
        <div>
          <div className=" flex-center-col mt-8">
            <LazyLoadImage
              effect="blur"
              className="cover-img h-80 object-cover w-full"
              src={
                display.backdrop_path
                  ? orig_image + display.backdrop_path
                  : "https://via.placeholder.com/1000x100"
              }
            />
            <LazyLoadImage
              effect="blur"
              className="rounded-2xl relative bottom-16  drop-shadow-2xl w-36 md:w-52 "
              src={
                display.poster_path
                  ? image_url + display.poster_path
                  : "https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
            />
          </div>

          <center className="text-3xl m-2">{display.original_title}</center>
          <center>
            <i className="card-title">
              {display.tagline ? `"${display.tagline}"` : []}
            </i>
          </center>
          <div className="flex-center-row m-3">
            {display.genres ? (
              display.genres.map((item) => (
                <Link to={`/genre/${item.id}/${item.name}`}>
                  <button className="button-ui">{item.name}</button>
                </Link>
              ))
            ) : (
              <p>No Genre</p>
            )}
          </div>
          <div className="p-3 flex-center-col">
            <p className="flex-center-row text-sm w-16 my-3 bg-yellow-400 p-1 rounded-md">
              <AiFillStar />
              {display.vote_average}
            </p>
            <p className="text-sm">
              {display.status} | {display.release_date} | {display.runtime}{" "}
              minutes
            </p>
          </div>
          <center className=" p-5 text-sm leading-6 bg-gray-700 ">
            <p>{display.overview ? display.overview : "No Data"}</p>
          </center>

          <Cast id={display.id} />
          <Videos id={display.id} />
          <GetKeyword id={display.id} />
        </div>
      )}
    </div>
  );
};

export default View;
