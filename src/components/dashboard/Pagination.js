import React from "react";
import _ from "lodash";

const Pagination = props => {
  const {
    pageNumbers,
    currentPage,
    handlePaginationClick,
    handlePrevNextClick
  } = props;

  const lastPage = _.last(pageNumbers);
  let start = 1,
    end = lastPage;

  //  3 or less pages
  if (pageNumbers.length < 4) {
    start = 1;
    end = lastPage;
  }
  //  current page is 1
  else if (currentPage == 1) {
    start = 1;
    end = 3;
  }
  //  current page is 2
  else if (currentPage == 2) {
    start = 1;
    end = 4;
  }

  //  current page is the second to last page
  else if (lastPage - currentPage == 1) {
    start = lastPage - 3;
    end = lastPage;
  }

  //  current page is the last page
  else if (lastPage == currentPage) {
    start = lastPage - 2;
    end = lastPage;
  } else {
    start = currentPage - 2;
    end = Number(currentPage) + 2;
  }
  //  get only the page numbers that need to be displayed
  const pages = _.slice(pageNumbers, start - 1, end);
  const prevBtnClassName =
    currentPage == 1 ? "waves-effect disabled" : "waves-effect";
  const nextBtnClassName =
    currentPage == lastPage ? "waves-effect disabled" : "waves-effect";

  return (
    <ul className="pagination">
      <li className={prevBtnClassName}>
        <a
          className="page-link"
          //  aria-label="Previous"
          id="prev"
          onClick={e => handlePrevNextClick(e, pages, currentPage)}
        >
          &lsaquo;
        </a>
      </li>
      {pages.map(number => {
        return (
          <li
            className={
              number == currentPage ? "waves-effect active" : "waves-effect"
            }
            key={number}
          >
            <a
              className="page-link"
              id={number}
              onClick={handlePaginationClick}
            >
              {number}
            </a>
          </li>
        );
      })}
      <li className={nextBtnClassName}>
        <a
          className="page-link"
          id="next"
          onClick={e => handlePrevNextClick(e, pages, currentPage)}
        >
          &rsaquo;
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
