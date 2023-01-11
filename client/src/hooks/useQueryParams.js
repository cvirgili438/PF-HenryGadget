import { useEffect,useCallback, useState } from 'react'
import {  useLocation } from 'react-router-dom'



export function useQueryParams (){
    const [query,setQuery]  =useState({})
    let {search} = useLocation()

const onDecodeParams= useCallback((params)=>{ 
    const replaceFirstCharacter = params.replace('?','');
    const splitString = replaceFirstCharacter.split('&');    
    const formattedQuery = {} 
    splitString.forEach( query => {
        const [key,value] = query.split('=')
        Object.assign(formattedQuery, {
            [key] : value
        })
    })
    setQuery(formattedQuery)
},[])

useEffect(()=>{
    if(search.trim()){
        onDecodeParams(search)
    }
},[onDecodeParams,search])
  return query
}