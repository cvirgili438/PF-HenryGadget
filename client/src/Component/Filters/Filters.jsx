import React,{useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import styles from "./Filters.module.css";
import {MdKeyboardArrowDown} from 'react-icons/md'
import { getAllFilters , getProductsByQuery } from "../../Redux/Action";
import {useLocation , useHistory} from 'react-router-dom'

function Filters() {

  const dispatch = useDispatch()
  
  const history = useHistory()
  const {search} = useLocation()
  const filters = useSelector((state)=> state.filters)
  const query = new URLSearchParams(search)
  // const[filter ,setFilter] = useState({
  //   brand: "",
  //   type: "",
  // })

  useEffect(()=>{
    dispatch(getAllFilters())
  },[dispatch])

  
    const [active, setActive] = useState({
      category:true,
      brand:true,
      storage:true,
      price:true
    })

    const toggle = (e)=>{
        
        if(e.target.id === "category")setActive({...active,[e.target.id]:!active.category});
        if(e.target.id === "brand")setActive({...active,[e.target.id]:!active.brand});
        if(e.target.id === "price")setActive({...active,[e.target.id]:!active.price});
        if(e.target.id === "storage")setActive({...active,[e.target.id]:!active.storage});

    }

    const handleSelect = (e)=>{
      // setFilter(filter => ({...filter,[e.target.name]:e.target.value}))
      if(e.target.name === 'sortPrice'){
        e.target.value === 'Higher prices' ? query.set(e.target.name,'up') : query.set(e.target.name,"down")
        history.push({search:query.toString()})
        return
      }
      query.set(e.target.name,e.target.value)
      history.push({search:query.toString()})
      console.log(search)
      dispatch(getProductsByQuery(search))
    }

  return (
    <div className={styles.container}>

      {/* <h2>{filter.type ? filter.type[0].toUpperCase()+filter.type.slice(1)+'s' : 'Filters'}</h2> */}

      <div className={styles.block_container}>
        <div className={styles.block_container_title} id="category" onClick={toggle} >
            Categegory
            <MdKeyboardArrowDown className={active.category ? styles.arrow_active : ""}/> 
        </div>
        <div className={active.category ? `${styles.options_container} ${styles.active}` : styles.options_container}>
          {filters.type? filters.type.map((e,i)=>{return <input onClick={handleSelect} type='button' key={`type${i}`} name='type'  value={`${e}`}/>}) : (<h3>Loading</h3>)}
        </div>
      </div>

      <div>
        <div className={styles.block_container_title} id='brand' onClick={toggle} >
            Brand
            <MdKeyboardArrowDown className={active.brand ? styles.arrow_active : ""}/> 
        </div>
        <div className={active.brand ? `${styles.options_container} ${styles.active_brand}` : styles.options_container}>
          {filters.brand? filters.brand.map((e,i)=>{return <input onClick={handleSelect} type='button' key={`type${i}`} name='brand'  value={`${e}`}/>}) : (<h3>Loading</h3>)}
        </div>
      </div>


      <div>
        <div className={styles.block_container_title} id='storage' onClick={toggle} >
            Storage
            <MdKeyboardArrowDown className={active.storage ? styles.arrow_active : ""}/> 
        </div>
        <div className={active.storage ? `${styles.options_container} ${styles.active_storage}` : styles.options_container}>
          {filters.storage? filters.storage.map((e,i)=>{return <input onClick={handleSelect} type='button' key={`type${i}`} name='storage'  value={`${e}`}/>}) : (<h3>Loading</h3>)}
        </div>
      </div>

      <div>
        <div className={styles.block_container_title} id='price' onClick={toggle} >
            Price
            <MdKeyboardArrowDown className={active.price ? styles.arrow_active : ""}/> 
        </div>
        <div className={active.price ? `${styles.options_container} ${styles.active_storage}` : styles.options_container}>
          <input onClick={handleSelect} type='button' name='sortPrice' value='Higher prices'/>
          <input onClick={handleSelect} type='button' name='sortPrice' value='Lower prices'/>
        </div>
      </div>


    </div>

    
  );
}

export default Filters;