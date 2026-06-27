import { useEffect, useState } from "react";
import "./Search.css";

import SearchItem from "./SearchItem/SearchItem";
import { supabase } from "../../lib/supabase";

import _ from "lodash";

const Search = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchSearch = _.debounce(async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${search}%`)
        .limit(10);

      if (error) {
        console.log(error.message);
      }

      setSearchItems(data);
    }, 1000);

    fetchSearch();
  }, [search]);

  return (
    <div className="search-container">
      <div className="input-container">
        <div className="search-input-container">
          <label htmlFor="search-input">Search</label>
          <input
            onChange={handleChange}
            value={search}
            type="text"
            id="search-input"
          />
        </div>
      </div>
      <div className="suggest-container">
        {searchItems.map((sI) => {
          return (
            <SearchItem
              key={sI.id}
              id={sI.id}
              img={sI.pictures[0]}
              title={sI.name}
              description={sI.description}
              onClose={onClose}
              setSearch={setSearch}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
