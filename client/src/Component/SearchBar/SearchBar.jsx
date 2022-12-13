import React from 'react'
import styles from './SearchBar.module.css'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineClear } from 'react-icons/ai'

function SearchBar(props) {
  return (
    <div className={styles.container}>
        <div className={styles.search_inputs_container}>
            <input className={styles.searchBar_input} placeholder={props.placeholder} onChange={props.onChange} value={props.value} name={props.name} type={props.type} />
            {props.input 
            ?(
                <div onClick={props.onClick[0]} className={styles.search_icon_container_clear}>
                    <AiOutlineClear style={{width:'1.5rem',height:'1.5rem'}}/>
                </div>
            )
            : null
            }


            <div className={styles.search_icon_container_submit} onClick={props.onClick[1]}>
                <BsSearch style={{width:'1.5rem',height:'1.5rem'}}/>
            </div>
        </div>
    </div>
  )
}

export default SearchBar