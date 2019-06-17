import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import ListImages from "./components/ListImages";

function App() {
  const [search, saveSearch] = useState("");
  const [images, saveImages] = useState([]);
  const [currentPage, saveCurrentPage] = useState(1);
  const [totalPages, saveTotalPages] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      if (search === "") return;

      const imagesPerPage = 30;
      const key = "12800628-bc2ad2e736bd9083000829227";

      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${currentPage}`;

      const response = await fetch(url);
      const result = await response.json();
      saveImages(result.hits);
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      saveTotalPages(calculateTotalPages);
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth", block: "end" });
    };
    consultarApi();
  }, [search, currentPage]);

  const previousPage = () => {
    let newCurrentPage = currentPage - 1;
    saveCurrentPage(newCurrentPage);
  };
  const nextPage = () => {
    let newCurrentPage = currentPage + 1;
    saveCurrentPage(newCurrentPage);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Search saveSearch={saveSearch} />
      </div>
      <div className="row justify-content-center">
        <ListImages images={images} />
        {currentPage === 1 ? null : (
          <button
            onClick={previousPage}
            type="button"
            className="btn btn-info mr-1"
          >
            Previous &laquo;
          </button>
        )}
        {currentPage === totalPages ? null : (
          <button onClick={nextPage} type="button" className="btn btn-info">
            Next &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
