import React, {useContext, useEffect, useState} from "react";
import CarouselImages from "../components/CarouselImages";
import {Snackbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {fetchProduct, ProductModel} from "../repositories/ProductRepository";
import {CartContext} from "../contexts/CartContext";
import ModifyProductModal from "../components/ModifyProductModal";
import {ApiError} from "../repositories/CallRunner";

export default function ExpandedProduct(){

    const context = useContext(CartContext)


    const [product, setProduct] = useState<ProductModel>()

    useEffect(()=>{
        const productID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        if(!isNaN(Number(productID))){
            fetchProduct(Number(productID)).then((result)=>{
               setProduct(result)
            }).catch(error=>{
                if (error instanceof ApiError) {
                    console.log(error)
                }
            })
        }
    },[])



    return (
        <div className={"row"}>
            <div className={"col-md"}>
                <CarouselImages images={product !==undefined ? product.images : []} />
            </div>
            <div className={"col-md"}>
                <Typography
                    variant="h3"
                >
                    {product?.name}
                </Typography>
                { product &&
                    <Button variant="contained" color="primary" onClick={() => {
                        context.addProduct(product.productID)
                    }}>
                        Add to basket
                    </Button>
                }
                <div className={"mt-5"}>
                    <Button variant="contained" color="primary"  data-toggle="modal" data-target="#modifyProductModal">
                        Edit
                    </Button></div>
                {
                    product &&
                    <ModifyProductModal product={product} />
                }

            </div>
        </div>
    )
}