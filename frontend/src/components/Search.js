import React, { useState } from "react";
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
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchHandler(e)}
          style={{
            backgroundColor: "#333",
            color: "#fff",
            border: "1px solid #444",
            fontFamily: "sans-serif",
          }}
        />
        <div className="input-group-append">
          <button
            onClick={searchHandler}
            id="search_btn"
            className="btn"
            style={{
              height: "100%",
              backgroundColor: "#87CEFA",
              color: "#FFFFFF",
              border: "1px solid #87CEFA",
              fontFamily: "sans-serif",
            }}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
