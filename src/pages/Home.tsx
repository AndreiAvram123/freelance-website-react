
import tShirt from '../images/tShirt.png'
import {useEffect, useState} from "react";
import {Category, fetchCategories} from "../repositories/ProductRepository";

export default function Home(){

    const [categories,setCategories] = useState<Array<Category>>([])

    useEffect(()=>{
         fetchCategories().then(result=>{
             let categories = result.data
             setCategories(categories)
         }).catch(error=>{
             console.log(error.error)
         })
    },[])

    return (
        <div>
        <div className = "row">
            <div className={"col"}>
        <div className="jumbotron mt-5">
        <h1 className="display-4">I am mercedes !!!!</h1>
        <p className="lead">This is our website and we are going to become ritch </p>
        <hr className="my-4"/>
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>
            </div>
        </div>
            <div className={"row container-categories"} >
            {
                categories.map((category)=>{
                   return(<div className={"card card-style col" } onClick={()=>window.location.href = "/products?category=" + category.name} >
                        <img src={tShirt} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{category.name}</h5>
                            <p className="card-text">{category.description}</p>
                        </div>
                    </div>
                   )
                })

            }

        </div>
       </div>
   )
}