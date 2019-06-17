import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Search = ({ saveSearch }) => {
  const [termSearch, saveTermSearch] = useState("");
  const [error, saveError] = useState(false);
  const searchImage = e => {
    e.preventDefault();
    if (termSearch === "") {
      saveError(true);
      return;
    }
    saveError(false);
    saveSearch(termSearch);
  };
  return (
    <form onSubmit={searchImage}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: Futbol o Café"
            onChange={e => saveTermSearch(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? <Error message="Agregar un término para la búsqueda" /> : null}
    </form>
  );
};

Search.propTypes = {
  saveSearch: PropTypes.func.isRequired
};

export default Search;
