import { useEffect, useState } from "react";
import Keyword from "./Keyword";
import useFetch from "../hooks/useFetch";
import { main_url } from "./url";
const GetKeyword = ({ id }) => {
  const GET_URL =
    main_url +
    `/movie/${id}/keywords?api_key=${process.env.REACT_APP_API_KEY}` +
    `&language=en-US`;
  const [display, setDisplay] = useState([]);
  const { apiData } = useFetch(GET_URL);
  useEffect(() => {
    setDisplay(apiData.keywords ? apiData.keywords.slice(0, 1) : []);
  }, [apiData]);
  return (
    <div>
      {display.map((item) => (
        <Keyword key={item.id} id={item.id} />
      ))}
    </div>
  );
};

export default GetKeyword;
