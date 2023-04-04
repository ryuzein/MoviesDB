import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
const TopNav = () => {
  const [search, setSearch] = useState("");

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form>
        <input
          className="outline-none p-2 border-none rounded-md text-sm text-black"
          type="text"
          value={search}
          onChange={handleInput}
          placeholder="Search Movies"
        />
        <Link to={search ? `/search/${search}` : "/"}>
          <button type="submit" className="relative right-8  text-indigo-500">
            <BsSearch />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default TopNav;
