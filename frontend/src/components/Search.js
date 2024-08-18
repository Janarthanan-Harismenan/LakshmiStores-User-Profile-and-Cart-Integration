import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchKeyWord, setSearchKeyword] = useState("");

  const navigate = useNavigate();

  function searchHandler(e) {
    e.preventDefault();
    if (searchKeyWord.trim()) {
      navigate(`/search?keyword=${searchKeyWord}`);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="col-12 col-md-6 mt-2 mt-md-0">
      <div className="input-group">
        ``
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
          onBlur={searchHandler}
        />
        <div className="input-group-append">
          <button onClick={searchHandler} id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
