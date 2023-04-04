import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Known from "./Known";
import Back from "./Back";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { image_url, main_url } from "./url";
const Person = () => {
  const { id } = useParams();

  const PERSON_URL =
    main_url +
    `/person/${id}?api_key=${process.env.REACT_APP_API_KEY}` +
    "&language=en-US";

  const [display, setDisplay] = useState([]);

  const Person = async () => {
    const response = await fetch(PERSON_URL);
    const data = await response.json();
    setDisplay(data);
  };

  useEffect(() => {
    Person();
  }, [id]);
  return (
    <div >
      <p style={{ display: "none" }}>
        {(document.title = "MovieDB | " + display.name)}
      </p>
      <Back/>
      <div className=' '>
      <div className='flex-center-col m-5'>
          <LazyLoadImage
            effect="blur"
        className="card-img"
        src={
          display.profile_path
            ? image_url + display.profile_path
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"
        }
          />
      </div>
      <center className='p-5'>
      <center className='text-2xl my-3'>{display.name}</center>
      <p className='my-3 '>{display.gender == 1 ? "Female" : "Male"}</p>
      <p className='text-sm m-2 bg-gray-700  p-5 leading-6 '>{display.biography ? display.biography : "No biography found"}</p>
      </center>
      </div>
     
    

      <Known id={display.id} />
    </div>
  );
};

export default Person;
