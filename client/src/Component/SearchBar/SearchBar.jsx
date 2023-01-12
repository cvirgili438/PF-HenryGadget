import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import { useSelector } from "react-redux";

function SearchBar(props) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector((state) => state.products);
  // console.log(products)
  const handleFilter = () => {
    // console.log(props.input)
    // console.log(products.length)
    const result = products.filter((e) =>
      e.name.toLowerCase().includes(props.input.toLowerCase())
    );
    setFilteredProducts(result);
    console.log("input value", props.input);
    console.log("result", result);
    console.log("filtered", filteredProducts);
  };

  const handleClearInput = () => {
    props.setInput("");
  };
  const handleClick = (e)=>{
    const searchProduct = e.target.innerHTML;
    if(props.pathname !== '/products'){
      props.history.push('/products')
    }
    props.query.set('name',searchProduct)   
    props.query.set('offset', 0)
    
    props.history.push({search:props.query.toString()})
  }
  return (
    <div className={styles.container}>
      <div className={styles.search_inputs_container}>
        <input
          className={styles.searchBar_input}
          placeholder={props.placeholder}
          autoComplete="off"
          onChange={(e) => {
            props.onChange(e);
            handleFilter();
          }}
          value={props.value}
          name={props.name}
          type={props.type}
          onKeyDown={props.handlePress}
        />
        <div
          onClick={props.onClick[0]}
          className={styles.search_icon_container_clear}
        >
          {props.input ? (
            <div className={styles.iconClear}>
              <AiOutlineClear style={{ width: "1.9rem", height: "1.9rem" }} />
            </div>
          ) : null}
        </div>
        <div
          className={styles.search_icon_container_submit}
          onClick={props.onClick[1]}
        >
          <BsSearch style={{ width: "1.9rem", height: "1.9rem" }} />
        </div>
      </div>
      {props.value  && props.pathname !== '/products' ?  (
        <div className={styles.search_box}>
          {filteredProducts.length > 0
          ? (
            filteredProducts.slice(0, 10).map((e) => (
              <span
                key={e.id}
                onClick={(e) => {
                  handleClick(e);
                  // props.onClick[1](e);
                  handleClearInput();
                }}
                className={styles.search_box_p}
              >
                {e.name}
              </span>
            ))
          ) : (
            <span className={styles.search_box_p}>No results</span>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
