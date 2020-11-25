
import React, {useEffect, useState} from "react";
import {fetchRecentProducts} from "./repositories/ProductRepository";
import Product from "./components/Product";

export default  function Home () {

    const [products,setProducts] = useState(new Array<JSX.Element>())
    const  [list1, setList1] = useState(new Array<JSX.Element>())
    const [list2, setList2] = useState(new Array<JSX.Element>())
    const [list3, setList3] = useState(new Array<JSX.Element>())


  useEffect(()=>{
      fetchRecentProducts().then(result => {
          console.log(result)
          if(result.error === "") {
              let products = result.data
              let mappedProducts = products.map(product => <Product
                  key={product.id}
                  price={product.price}
                  id={ product.id}
                  name={product.name}
                  image={product.image}
              />)
              setProducts(mappedProducts)
          }
      }).catch(error=> {
          console.log(error)
      })
  },[])


    useEffect(() => {
        let tempList1:JSX.Element[] = []
        let tempList2 :JSX.Element[]= []
        let tempList3:JSX.Element[] = []

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


    return (
        <div className={"row"}>
                  <div className={"col"}>{list1}</div>
                    <div className={"col"}>{list2}</div>
                    <div className={"col"}>{list3}</div>
                </div>);
}