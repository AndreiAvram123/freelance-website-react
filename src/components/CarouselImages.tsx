import {ProductImage} from "../repositories/ProductRepository";
import React from "react";
import {BASE_URL_IMAGES} from "../utils/ApiConstants";

 type props ={
    images : Array<ProductImage>
}

export default function CarouselImages (props: props){

    let imagesItems = props.images.map((productImage,index)=>{
        return ( <div className= {index ===0 ? "carousel-item active" : "carousel-item"} key={index + "image"}>
                <img className="d-block w-100" src={productImage.imageURl} alt="First slide"/>
            </div>)

    })

    let indicatorItems = props.images.map((product,index)=>{
         return ( <li data-target="#carouselExampleIndicators"  key = {product.imageURl} data-slide-to={index} className={index ===0 ? "active" : ""}/>)
    })


    return (
                <div id="carouselExampleControls" className="carousel slide"   data-ride="carousel">
                    <ol className="carousel-indicators">
                        {indicatorItems}
                    </ol>
                    <div className="carousel-inner">
                        {imagesItems}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

    )
}