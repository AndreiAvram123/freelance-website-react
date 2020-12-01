
import React, {useEffect, useState} from "react";
import {fetchProducts} from "../repositories/ProductRepository";
import Product from "../components/Product";
import SearchIcon from '@material-ui/icons/Search';
import {performSearch} from "../components/LiveSearch";
import { useLocation } from "react-router-dom";
export default  function ProductsPage () {
    const [products, setProducts] = useState(new Array<JSX.Element>())
    const [list1, setList1] = useState(new Array<JSX.Element>())
    const [list2, setList2] = useState(new Array<JSX.Element>())
    const [list3, setList3] = useState(new Array<JSX.Element>())
    const [list4, setList4] = useState(new Array<JSX.Element>())


    let category ="ALL"
    let queryCategory = new URLSearchParams(useLocation().search).get("category");
    if(queryCategory !== null){
        category = queryCategory
    }
    useEffect(() => {

        fetchProducts(category).then(result => {
            if (result.error === "") {
                let products = result.data
                let mappedProducts = products.map(product => <Product
                    key={product.productID + ""}
                    price={product.price}
                    productID={product.productID}
                    name={product.name}
                    images={product.images}
                />)
                setProducts(mappedProducts)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [category])


    useEffect(() => {
        let tempList1: JSX.Element[] = []
        let tempList2: JSX.Element[] = []
        let tempList3: JSX.Element[] = []
        let tempList4: JSX.Element[] = []

        products.forEach((product, index) => {
            if (index % 4 === 0) {
                tempList4.push(product)
            }
            if (index % 4 === 1) {
                tempList1.push(product)
            }
            if (index % 4 === 2) {
                tempList2.push(product)
            }
            if(index % 4 === 3){
                tempList3.push(product)
            }

            setList1(tempList1)
            setList2(tempList2)
            setList3(tempList3)
            setList4(tempList4)
        })
    }, [products])

    return (
        <div>
            <div className="input-group md-form form-sm form-2 pl-0 search-box">
                <input className="form-control mr-sm-2 search-field" autoComplete="off" placeholder="Search posts..."
                       name="search-products-field"
                       id="search-products-field"
                       aria-label="Search"
                       onChange={(event)=> {
                               performSearch(event.target.value)

                       }}

                />
                    <button type="button" className="btn btn-primary mr-2" data-toggle="modal"
                            data-target="#filtersModal">Filters
                    </button>
                    <div className="input-group-append">
                        <button type="submit" className="input-group-text search-button" name="search-button">  <SearchIcon /></button>
                    </div>

            </div>

            <div className={"row mt-5"}>
                <div className={"col"}>{list1}</div>
                <div className={"col"}>{list2}</div>
                <div className={"col"}>{list3}</div>
                <div className={"col"}>{list4}</div>
            </div>
        </div>)
}