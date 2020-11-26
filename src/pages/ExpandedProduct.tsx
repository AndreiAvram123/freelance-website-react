import React from "react";
import {Image} from "@material-ui/icons";
import CarouselImages from "../components/CarouselImages";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {ProductModel} from "../repositories/ProductRepository";

export default function ExpandedProduct(){

    const productID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    if(isNaN(Number(productID))){

    }
    return (
        <div className={"row"}>
          <CarouselImages />
    <div className={"col"}>
        <Typography
            variant="h3"
        >
            Product title
        </Typography>
        <Button variant="contained" color="primary">
            Add to basket
        </Button>
    </div>
        </div>
    )
}