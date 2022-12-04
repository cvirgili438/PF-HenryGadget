import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryParams } from '../../hooks/useQueryParams'
import { useHistory } from 'react-router-dom'
import { objectToQuery } from '../../hooks/ObjectToQuery'


// import { setPageView } from '../../redux/actions/index';
import { getProductsByQuery } from '../../Redux/Action';

import styles from './Pagination.module.css'


const stripedPagination = (totalPages, currentPage, maxPages) => {
  let startPage, endPage;

  if (totalPages <= maxPages) {   // totalPages es menos que todas las disponibles
    startPage = 2;
    endPage = totalPages;
  } else {                        // totalPages es mas, se calcula el intervalo que se muestra
    let beforActualPage = Math.floor(maxPages / 2);     // paginas antes de actual
    let afterActualPage = Math.ceil(maxPages / 2) - 1;  // paginas despues de actual
    if (currentPage <= beforActualPage + 1) {     // estamos al principio
      startPage = 2;
      endPage = maxPages;
    } else if (currentPage + afterActualPage >= totalPages) { //estamo al final
      startPage = totalPages - maxPages + 1;
      endPage = totalPages - 1;
    } else {                                          // estamos en el medio
      startPage = currentPage - beforActualPage;
      endPage = currentPage + afterActualPage;
    }
  }
  let final = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
  if (totalPages <= maxPages) {
    return final.splice(final.length - 1)
  } else {
    return final
  }
}

const Pagination = () => {
  const [shownPages, setShownPages] = useState([2,3,4,5,6]);

  const dispatch = useDispatch();

  const totalProducts = 18;
  // const countries = useSelector(state => state.countries);
  // const continents = useSelector(state => state.filterContinent);
  // const activities = useSelector(state => state.filterActivity);
  // const theme = useSelector(state => state.theme);
  // const page = useSelector(state => state.page);
  const page = 1;

  // let keys_c = Object.keys(continents).filter(k => continents[k] === true)
  // let keys_a = Object.keys(activities).filter(k => activities[k] === true)

  // const visibles = countries.filter(c => keys_c.includes(c.continent) && c.activities.some(obj => keys_a.includes(obj.name))).length

  const pages = Math.ceil(totalProducts / 9);
  const maxPages = 5;

  let query = useQueryParams()
  console.log(query)
  let handlePaginated = (e)=>{
    // queries.limit = 9
    // queries.offset = e.target.id*9-9
    // let string = objectToQuery(queries)
    // history.push(`?${string}`)
    dispatch(getProductsByQuery(query))
  }

  const handleInputChange = (e) => {
    // dispatch(setPageView(e.target.value))
    query.limit = 9
    query.offset = e.target.value * 9 - 9
    dispatch(getProductsByQuery(query))
  }

  const handleInputLess = (e) => {
    // dispatch(setPageView(page - 5))
  }

  const handleInputMore = (e) => {
    // dispatch(setPageView(page + 5))
  }

  useEffect(() => {
    if(totalProducts < 10) {
      // dispatch(setPageView(1))
    }
    if (page > pages) {
      // dispatch(setPageView(pages))
    }
    setShownPages(stripedPagination(pages, page, maxPages))
  }, [page, totalProducts, pages, dispatch]);
  
  return (
    totalProducts < 9 ? null :
    <div className={ styles.container }>
      {
      <>
        { pages <= maxPages ?
        <>
        {
          [...Array(pages).keys()].map(i => (
            <button onClick={handleInputChange} name={i+1} key={i+1} value={i+1}
                    className={page === i+1 ? styles.actualPage : styles.normalPage }>{i+1}</button>
          ))
        }
        </>
        :
        <>
          <button onClick={handleInputChange} name={1} key={1} value={1}
                  className={page === 1 ? styles.actualPage : styles.normalPage }>1</button>
          { shownPages[0] > 2 ? <> ... </> : null }
          { shownPages[0] > 6 ? <span className={ styles.hideSkipPage }><button className={ styles.skipPage } onClick={ handleInputLess } name='less' value='-5'>-5</button> ... </span> : null}
          { shownPages.map(i => (
                <button onClick={handleInputChange} name={i} key={i} value={i}  className={page === i ? styles.actualPage : styles.normalPage }>{i}</button>
              )
            )
          }
          { shownPages[shownPages.length-1] < pages - 5 ? <span className={ styles.hideSkipPage }> ... <button className={ styles.skipPage } onClick={handleInputMore} name='more' value='+5'>+5</button></span> : null}
          { shownPages[shownPages.length-1] < pages - 1 ? <> ... </> : null }
          <button onClick={handleInputChange} name={pages} key={pages} value={pages}
                  className={page === pages ? styles.actualPage : styles.normalPage }>{pages}</button>
        </>
        }
        {/* <div className={ styles.hide }>Pages: {pages} - Actual page: {page}</div> */}
      </>
      }
    </div>
  )
}

export default Pagination;