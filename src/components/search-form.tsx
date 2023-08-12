import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "../assets/search.svg";

function SearchForm() {
  const [searchText, setSearchText] = useState("");
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUrlSearchParams({ search: searchText });
  };

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setSearchText(urlSearchParams.get("search") || "");
  }, [urlSearchParams]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={searchText}
        onChange={handleChangeSearchText}
        placeholder="Search for products..."
      />
      <button>
        <img src={Search} alt="search" />
      </button>
    </form>
  );
}

export default SearchForm;
