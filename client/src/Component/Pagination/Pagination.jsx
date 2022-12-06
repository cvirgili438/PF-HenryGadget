import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryParams } from '../../hooks/useQueryParams'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import { objectToQuery } from '../../hooks/ObjectToQuery'


import { setPageView } from '../../Redux/Action';
import { getProductsByQuery } from '../../Redux/Action';

import styles from './Pagination.module.css'

// ESTA FUNCION MUESTRA LOS NUMEROS SE OCUPA DE MOSTRAR LOS NUMEROS DE PAGINAS ADELANTE Y ATRAS DE LA ACTUAL
// maxPages ES CUANTAS PAGINAS MUESTRA EL PAGINADOR, POR EJ> 5 ---> 3 4 5 6 7 (DOS ANTES Y DOS DESPUES, MAS LA ACTUAL)
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

  const history = useHistory()
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  
  const page = useSelector(state => state.page);
  const products = useSelector(state => state.filteredProducts);

  const productsPerPage = 9; // ESTO HAY QUE CAMBIARLO CUANDO TENGAMOS MAS PRODUCTOS, TAMBIEN PODRIA ESTAR ALMACENADO EN LA BD COMO CONFIGURACION DE VISUALIZACION
  const totalProducts = useSelector(state => state.totalProducts); // ESTO VA A VENIR DEL BACK EN UNA RUTA QUE DIGA CUANTOS PRODUCTOS HAY
  
  const limit = query.get('limit') || productsPerPage;
  const offset = query.get('offset') || 0;
  
  const [shownPages, setShownPages] = useState([2,3,4,5,6]);

  const dispatch = useDispatch();
  
  const pages = Math.ceil(totalProducts / productsPerPage);
  const maxPages = 5;

  const queryNew = useQueryParams();

  const handleInputChange = (e) => {
    dispatch(setPageView(e.target.value));
    queryNew.limit = productsPerPage;
    queryNew.offset = e.target.value * productsPerPage - productsPerPage;
    let string = objectToQuery(queryNew);
    dispatch(getProductsByQuery(`?${string}`));
    history.push(`?${string}`);
  }

  const handleInputLess = (e) => {
    dispatch(setPageView(page - 5));
  }

  const handleInputMore = (e) => {
    dispatch(setPageView(page + 5));
  }

  useEffect(() => {
    dispatch(setPageView((offset / productsPerPage) + 1))
    if(totalProducts < productsPerPage) {
      dispatch(setPageView(1))
    }
    if (page > pages) {
      dispatch(setPageView(pages))
    }
    setShownPages(stripedPagination(pages, page, maxPages))
  }, [products, page, totalProducts, pages, limit, offset, dispatch]);
  
  // SOBRE LO QUE SIGUE... NO PREGUNTEN, FUNCIONA OK 😁
  return (
    totalProducts <= productsPerPage ? null :
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