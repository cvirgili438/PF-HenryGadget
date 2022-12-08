import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useLocation, useHistory } from 'react-router-dom'

import { getAllFilters, getProductsByQuery } from "../../Redux/Actions/products.js";

import SkeletonFilter from "../SkeletonCards/SkeletonFilter";

import styles from "./Filters.module.css";

function Filters() {

  const dispatch = useDispatch()

  const history = useHistory()
  const { search } = useLocation()
  const filters = useSelector((state) => state.filters)
  const query = new URLSearchParams(search)

  let brand = query.get("brand")
  let type = query.get('type')
  let storage = query.get('storage')
  let price = query.get("sortPrice")
  let ram = query.get("ram")
  
  const [active, setActive] = useState({
    category: true,
    brand: true,
    storage: true,
    price: true,
    ram: true
  })

  const [select, setSelect] = useState({
    type: type || "",
    brand: brand || "",
    storage: storage || "",
    price: price || "",
    ram: ram || ""
  })


  useEffect(() => {
    dispatch(getProductsByQuery(search))
    dispatch(getAllFilters())
  }, [dispatch, select])




  const toggle = (e) => {

    if (e.target.id === "category") setActive({ ...active, [e.target.id]: !active.category });
    if (e.target.id === "brand") setActive({ ...active, [e.target.id]: !active.brand });
    if (e.target.id === "price") setActive({ ...active, [e.target.id]: !active.price });
    if (e.target.id === "storage") setActive({ ...active, [e.target.id]: !active.storage });
    if (e.target.id === "ram") setActive({ ...active, [e.target.id]: !active.ram })

  }

  const handleSelect = (e) => {
    if (e.target.name === 'sortPrice') {
      if(query.get(e.target.name) === e.target.value){
        console.log("adentro")
        query.delete(e.target.name)
        history.push({ search: query.toString() })
        setSelect({...select,price:""})
        return
      }
      query.set(e.target.name,e.target.value)
      setSelect({ ...select, price: e.target.value })
      history.push({ search: query.toString() })
      dispatch(getProductsByQuery(search))
      return
    }
    if (e.target.name === "type") {
      let withOutS = e.target.value.substring(0, e.target.value.length - 1)
      let toLower = withOutS[0].toLowerCase() + withOutS.slice(1)
      if(query.get(e.target.name) === toLower){
        query.delete(e.target.name)
        history.push({ search: query.toString() })
        setSelect({...select,[e.target.name]:""})
        return
      }
      setSelect({ ...select, [e.target.name]: toLower })
      query.set(e.target.name, toLower)
      history.push({ search: query.toString() })
      dispatch(getProductsByQuery(search))
      return
    }
    if(query.get(e.target.name) === e.target.value){
      query.delete(e.target.name)
      history.push({ search: query.toString() })
      setSelect({...select,[e.target.name]:""})
      return
    }

    setSelect({ ...select, [e.target.name]: e.target.value })
    query.set(e.target.name, e.target.value)
    history.push({ search: query.toString() })
    dispatch(getProductsByQuery(search))
  }

  const handleClear = () => {
    setSelect({
      ...select,
      type: "",
      brand: "",
      storage: "",
      price: "",
      ram:""
    })

    query.delete("brand")
    query.delete("sortPrice")
    query.delete("type")
    query.delete("storage")
    query.delete("ram")
    query.delete('offset')
    query.delete('limit')
    history.push({ search: query.toString() })
    dispatch(getProductsByQuery(search))
  }

  return (
    <div className={styles.container}>

      <h2>{query.get('type') ? query.get('type')[0].toUpperCase() + query.get('type').slice(1) + 's' : ""}</h2>

      <div className={styles.block_container}>
        <div className={styles.block_container_title} id="category" onClick={toggle} >
          Categegory
          <MdKeyboardArrowDown className={active.category ? styles.arrow_active : ""} />
        </div>
        <div className={active.category ? `${styles.options_container} ${styles.active}` : styles.options_container}>
          {filters.type ? filters.type.map((e, i) => { return <input onClick={handleSelect} type='button' key={`type${i}`} name='type' className={`${styles.input} ${select.type === e ? styles.input_active : ""}`} value={`${e[0].toUpperCase()}${e.slice(1) + 's'}`} /> }) : (<SkeletonFilter/>)}
        </div>
      </div>

      <div>
        <div className={styles.block_container_title} id='brand' onClick={toggle} >
          Brand
          <MdKeyboardArrowDown className={active.brand ? styles.arrow_active : ""} />
        </div>
        <div className={active.brand ? `${styles.options_container} ${styles.active_brand}` : styles.options_container}>
          
          {filters.brand ? filters.brand.map((e, i) => { return <input onClick={handleSelect} className={`${styles.input} ${select.brand === e ? styles.input_active : ""}`} type='button' key={`type${i}`} name='brand' value={`${e}`} /> }) : (Array.from(new Array(9)).map((e,i)=>{
            return <SkeletonFilter key={i}/>
          }))}
        </div>
      </div>


      <div>
        <div className={styles.block_container_title} id='storage' onClick={toggle} >
          Storage
          <MdKeyboardArrowDown className={active.storage ? styles.arrow_active : ""} />
        </div>
        <div className={active.storage ? `${styles.options_container} ${styles.active_storage}` : styles.options_container}>
          {filters.storage ? filters.storage.map((e, i) => { return (<input onClick={handleSelect} type='button' key={`type${i}`} name='storage' value={`${e}`} className={`${styles.input} ${select.storage === e ? styles.input_active : ""}`} />) }) : (<SkeletonFilter/>)}
        </div>
      </div>

      <div>
        <div className={styles.block_container_title} id='ram' onClick={toggle} >
          Ram
          <MdKeyboardArrowDown className={active.ram ? styles.arrow_active : ""} />
        </div>
        <div className={active.ram ? `${styles.options_container} ${styles.active_ram}` : styles.options_container}>
          {filters.ram ? filters.ram.map((e,i) => {return(<input onClick={handleSelect} type='button' key={`type${i}`} name='ram' value={`${e}`} className={`${styles.input} ${select.ram === e ? styles.input_active : ""}`} />) }) : (<SkeletonFilter/>)}
        </div>
      </div>

      <div>
        <div className={styles.block_container_title} id='price' onClick={toggle} >
          Price
          <MdKeyboardArrowDown className={active.price ? styles.arrow_active : ""} />
        </div>
        <div className={active.price ? `${styles.options_container} ${styles.active}` : styles.options_container}>
          <input type='button' value="Higher prices" onClick={handleSelect} name="sortPrice" className={`${styles.input} ${select.price === 'Higher prices' ? styles.input_active : ""}`} />
          <input type='button' value='Lower prices' onClick={handleSelect} className={`${styles.input} ${select.price === 'Lower prices' ? styles.input_active : ""}`} name="sortPrice" />
        </div>
      </div>

      <div>
        <input type='button' onClick={handleClear} className={styles.clear_button} value='Clear filters' />
      </div>

    </div>
  );
}

export default Filters;