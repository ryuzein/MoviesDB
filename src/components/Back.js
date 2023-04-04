import React from "react";
import { useHistory } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
const Back = () => {
  const history = useHistory();
  return (
    <div className="m-3">
      <button onClick={history.goBack} className=" text text-base ">
        <IoIosArrowBack className="" />
        Back
      </button>
    </div>
  );
};

export default Back;
