import {createContext} from "react";
import {Category} from "../repositories/ProductRepository";

const CategoriesContext = createContext({
    categories: new Array<Category>(),

    setCategories: (categories:Array<Category>)=>{

    },
});
export default CategoriesContext;
