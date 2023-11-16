import React from "react";

const Pagination = ({
    rowsPerPage,
    totalPostLength,
    setCurrentPage,
    currentPage,
    currentPackageInView
}) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPostLength / rowsPerPage); i++) {
        pages.push(i);
    }

    const nextAndPrev = query => {
        if (query == "next") {
            if (currentPage < totalPostLength / rowsPerPage) {
                setCurrentPage(currentPage + 1);
            }
        } else if (query == "prev") {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
    };

    return (
    <>
      {
        Math.ceil(totalPostLength / currentPackageInView?.length) > 1 &&      
        <div>
            <button
                onClick={() => nextAndPrev("next")}
                className={`border-2 border-solid border-light rounded-md px-2 py-1 m-1 hover:bg-light`}
            >
                Next
            </button>
            {pages
                .map(pageNum => {
                    return (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`border-2 border-solid border-light rounded-md px-2 py-1 m-1 hover:bg-light ${pageNum ===
                            currentPage
                                ? "activePagination"
                                : ""}`}
                        >
                            {pageNum}
                        </button>
                    );
                })
                .splice(currentPage, 4)}
            <button
                onClick={() => nextAndPrev("prev")}
                className={`border-2 border-solid border-light rounded-md px-2 py-1 m-1 hover:bg-light`}
            >
                Prev
            </button>
        </div>
      }
    </>
    );
};

export default Pagination;
