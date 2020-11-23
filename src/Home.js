import Product from "./components/Product";
import React, {useEffect, useState} from "react";
import {fetchRecentProducts} from "./repositories/ProductRepository";
import {render} from "@testing-library/react";

export default  function Home () {
    const [products, setProducts] = useState([])
    const [list1, setList1] = useState([])
    const [list2, setList2] = useState([])
    const [list3, setList3] = useState([])
    fetchRecentProducts().then(products => {
        let mappedProducts = products.map(product => <Product key = {product.id} product = {product} />)
        setProducts(mappedProducts)
    })
    useEffect(() => {
        let tempList1 = []
        let tempList2 = []
        let tempList3 = []
        products.forEach((product, index) => {
            if (index % 3 === 0) {
                tempList3.push(product)
            }
            if (index % 3 === 1) {
                tempList1.push(product)
            }
            if (index % 3 === 2) {
                tempList2.push(product)
            }

            setList1(tempList1)
            setList2(tempList2)
            setList3(tempList3)
        })
    }, [products])

        return (<div className="container">
                <div className={"row"}>
                    <div className={"col"}>
                        {list1}
                    </div>
                    <div className={"col"}>
                        {list2}
                    </div>
                    <div className={"col"}>
                        {list3}
                    </div>
                </div>
            </div>
        )
}