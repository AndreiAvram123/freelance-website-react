import React, {useEffect, useState} from "react";
import CarouselImages from "../components/CarouselImages";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {fetchProduct, ProductModel} from "../repositories/ProductRepository";

export default function ExpandedProduct(){

    let initial:ProductModel = {
        productID : 100,
        name : "andrei",
        price: 100,
        images: []
    }
    const [product, setProduct] = useState<ProductModel>(initial)

    useEffect(()=>{
        const productID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        if(!isNaN(Number(productID))){
            fetchProduct(Number(productID)).then((result)=>{
                let data = result.data
                setProduct(data)
            }).catch(error=>{
                console.log(error)
            })
        }else{

        }
    },[])
    useEffect(()=>{
      console.log(product)
    },[product])

    return (
        <div className={"row"}>
          <CarouselImages  images={ product !== undefined ?product.images : []} />
    <div className={"col"}>
        <Typography
            variant="h3"
        >
            {product?.name}
        </Typography>
        <Button variant="contained" color="primary">
            Add to basket
        </Button>
    </div>
        </div>
    )
}