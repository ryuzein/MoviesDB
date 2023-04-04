import Np from "./Np";
import Trending from "./trending/Trending";
import React from "react";
const Home = () => {
  const [error, seterror] = React.useState();
  React.useEffect(() => {
    document.title = `MovieDB | Home`;
  }, [error]);
  return (
    <div className="m-2">
      <Trending />
    </div>
  );
};

export default Home;
