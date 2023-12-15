import React from "react";
const Pagination = (props) => {
  const { totalPage, currentPage, keyword = "", sort = "" } = props
  return (
    <nav className="float-end mt-4" aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled': ''}`}>
            <button className="page-link" onClick={(e)=>{
              e.preventDefault();
              props.handlePage(keyword, currentPage-1, sort)
            }}>
                Previous
            </button>
        </li>


        { totalPage && totalPage.map((indexPage)=>(
        <li className={`page-item ${indexPage === currentPage ? "active" : ""}`} key={indexPage}>
            <button className="page-link" onClick={(e)=>{
              e.preventDefault();
              props.handlePage(keyword, indexPage, sort)
            }}>
              {indexPage}
            </button>
        </li>
        ))}

        <li className={`page-item ${currentPage === totalPage?.length  ? 'disabled': ''}`}>
            <button className="page-link" onClick={(e)=>{
              e.preventDefault();
              props.handlePage(keyword, currentPage+1, sort)
            }}>
                Next
            </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;



// import React from "react";
// import { Link } from "react-router-dom";

// const Pagination = (props) => {
//   const { totalPage, currentPage, keyword = "" } = props
//   return (
//     <nav className="float-end mt-4" aria-label="Page navigation">
//       <ul className="pagination">
//         <li className={`page-item ${currentPage === 1 ? 'disabled': ''}`}>
//             <Link className="page-link" to={keyword ?  `/products/search/${keyword}/page/${currentPage-1}` : `/products/page/${currentPage-1}`}>
//                 Previous
//             </Link>
//         </li>


//         { totalPage && totalPage.map((indexPage)=>(
//         <li className={`page-item ${indexPage === currentPage ? "active" : ""}`} key={indexPage}>
//             <Link className="page-link" to={keyword ?  `/products/search/${keyword}/page/${indexPage}` : `/products/page/${indexPage}`}>
//               {indexPage}
//             </Link>
//         </li>
//         ))}

//         <li className={`page-item ${currentPage === totalPage?.length  ? 'disabled': ''}`}>
//             <Link className="page-link" to={keyword ?  `/products/search/${keyword}/page/${currentPage+1}` : `/products/page/${currentPage+1}`}>
//                 Next
//             </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;
