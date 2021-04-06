import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {Category, fetchCategories} from "../repositories/ProductRepository";

type Props = {
    categories : Array<Category>,
    setCategories: Dispatch<SetStateAction<Array<Category>>>
}

const initialState:Props = {
    categories : [],
    setCategories: ()=>{}
}
type PropsProvider = {
    children:React.ReactNode
}

export const CategoriesContext = createContext<Props>(initialState)


export const CategoriesProvider = (props:PropsProvider) =>{
    const [categories,setCategories] = useState<Array<Category>>([])

    useEffect(()=>{
         fetchCategories().then(response=>{
                setCategories(response.data)
            }).catch(error=>{
                console.log(error)
            })
    },[])

    return (
      <CategoriesContext.Provider value={{categories:categories,setCategories:setCategories}}>
          {props.children}
      </CategoriesContext.Provider>
    )
}
