import React,{useState} from "react";
import styles from "./Filters.module.css";
import {MdKeyboardArrowRight} from 'react-icons/md'

function Filters() {
    
    const [active, setActive] = useState({
      category:false,
      brand:false,
      color:false,
      storage:false
    })

    const toggle = (e)=>{
        console.log(e.target.id)
        if(e.target.id === "category")setActive({...active,[e.target.id]:!active.category})
        if(e.target.id === "brand")setActive({...active,[e.target.id]:!active.brand})
        if(e.target.id === "color")setActive({...active,[e.target.id]:!active.color})
        if(e.target.id === "storage")setActive({...active,[e.target.id]:!active.storage})

    }

  return (
    <div className={styles.container}>
      <h2>Filters</h2>
      <div className={styles.block_container}>
        <div className={styles.block_container_title} id="category" onClick={toggle} >
            Categegory
            <MdKeyboardArrowRight className={active.category ? styles.arrow_active : ""}/> 
        </div>
        <div className={active.category ? `${styles.options_container} ${styles.active}` : styles.options_container}>
          <div>
            <input type="checkbox" id="cell" />
            <label htmlFor="cell">Cellphones</label>
          </div>
          <div>
            <input type="checkbox" name="headphones" id="headphones" />
            <label htmlFor="headphones">Headphones</label>
          </div>
          <div>
            <input type="checkbox" name="speakers" id="speakers" />
            <label htmlFor="speakers">Speakers</label>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.block_container_title} id='brand' onClick={toggle} >
            Brand
            <MdKeyboardArrowRight className={active.brand ? styles.arrow_active : ""}/> 
        </div>
        <div className={active.brand ? `${styles.options_container} ${styles.active}` : styles.options_container}>
          <div>
            <input type="checkbox" id="Samsung" />
            <label htmlFor="Samsung">Samsung</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="Motorola">Motorola</label>
          </div>
          <div>
            <input type="checkbox" id="Xiamomi" />
            <label htmlFor="Xiaomi">Xiaomi</label>
          </div>
          <div>
            <input type="checkbox" name="iPhone" id="iPhone" />
            <label htmlFor="iPhone">iPhone</label>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.block_container_title} id='color' onClick={toggle} >
            Color
            <MdKeyboardArrowRight className={active.color ? styles.arrow_active : ""}/> 
        </div>
        <div className={active.color ? `${styles.options_container} ${styles.active_color}` : styles.options_container}>
          <div>
            <input type="checkbox" name="red" id="red" />
            <label htmlFor="red">Red</label>
          </div>
          <div>
            <input type="checkbox" name="blue" id="blue" />
            <label htmlFor="blue">Blue</label>
          </div>
          <div>
            <input type="checkbox" name="green" id="green" />
            <label htmlFor="green">Green</label>
          </div>
          <div>
            <input type="checkbox" name="grey" id="grey" />
            <label htmlFor="grey">Grey</label>
          </div>
          <div>
            <input type="checkbox" name="black" id="black" />
            <label htmlFor="black">Black</label>
          </div>
          <div>
            <input type="checkbox" name="pink" id="pink" />
            <label htmlFor="pink">Pink</label>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.block_container_title} id='storage' onClick={toggle} >
            Storage
            <MdKeyboardArrowRight className={active.storage ? styles.arrow_active : ""}/> 
        </div>
        <div className={active.storage ? `${styles.options_container} ${styles.active_storage}` : styles.options_container}>
          <div>
            <input type="checkbox" id="1TB" />
            <label htmlFor="1TB">1TB</label>
          </div>
          <div>
            <input type="checkbox" id="512" />
            <label htmlFor="512">512GB</label>
          </div>
          <div>
            <input type="checkbox" name="256" id="256" />
            <label htmlFor="256">256GB</label>
          </div>
          <div>
            <input type="checkbox" name="128" id="128" />
            <label htmlFor="128">128GB</label>
          </div>
          <div>
            <input type="checkbox" name="64" id="64" />
            <label htmlFor="64">64GB</label>
          </div>
          <div>
            <input type="checkbox" name="32" id="32" />
            <label htmlFor="32">32GB</label>
          </div>
          <div>
            <input type="checkbox" name="16" id="16" />
            <label htmlFor="16">16GB</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
