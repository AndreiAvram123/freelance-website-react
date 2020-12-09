import React, {useContext, useEffect, useState} from "react";
import CarouselImages from "../components/CarouselImages";
import {Card, CardActions, CardContent, makeStyles, Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {fetchProduct, ProductModel} from "../repositories/ProductRepository";
import {CartContext} from "../contexts/CartContext";
import {ApiError} from "../repositories/CallRunner";
import StarIcon from '@material-ui/icons/Star';
import {Star} from "@material-ui/icons";


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

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });

    const classes = useStyles();

    const review =  <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                12/09/2020
            </Typography>
            <Typography variant="h5" component="h2">
                Andrei Avram
            </Typography>
            <div>
                <StarIcon htmlColor={"#ffd500"}/>
                <StarIcon htmlColor={"#ffd500"}/>
                <StarIcon htmlColor={"#ffd500"}/>
                <StarIcon htmlColor={"#ffd500"}/>
                <StarIcon htmlColor={"#ffd500"}/>
            </div>
            <Typography variant="body2" component="p" className={"mt-3"}>
                This is a beautiful girl
            </Typography>
        </CardContent>

    </Card>


    return (
        <div>
        <div className={"row mt-5"}>
            <div className={"col-md"}>
                <CarouselImages images={product !==undefined ? product.images : []} />
            </div>
            <div className={"col-md"}>
                <Typography
                    variant="h3">
                    {product?.name}
                </Typography>
                <div>
                <div>
                        <StarIcon htmlColor={"#ffd500"}/>
                        <StarIcon htmlColor={"#ffd500"}/>
                        <StarIcon htmlColor={"#ffd500"}/>
                        <StarIcon htmlColor={"#ffd500"}/>
                        <StarIcon htmlColor={"#ffd500"}/>

                </div>
                    <Typography
                        color={"primary"}
                        variant = "subtitle1">
                        7 reviews
                    </Typography>
                </div>
                <Typography
                    variant = "subtitle1">
                    The best cat in the world
                </Typography>
                <Typography
                    variant = "subtitle1">
                   Products in stock : <span style={{color : "blue"}}>{product?.stock}</span>
                </Typography>
                <Typography>
                </Typography>

        </div>
            <div className={"col-md"}>
                <Paper elevation={1} >
                    <div style={{padding: "15px"}} >
                        <Typography
                            variant = "h4">
                            £{product?.price}
                        </Typography>
                        { product &&
                        <Button variant="contained" color="primary" className={"mt-3"} onClick={() => {
                            context.addProduct(product.productID)
                        }}>
                            Add to basket
                        </Button>
                        }
                    </div>
                </Paper>

            </div>
            </div>
            <Typography
                variant = "h4"
                className={"mt-5"}
                style={{margin:"auto"}}
            >
                Reviews
            </Typography>

            <div className={"row mt-5"}>
                <div className={"col"}>
                    {review}
                </div>
                <div className={"col"}>
                    {review}
                </div>
                <div className={"col"}>
                    {review}
                </div>
            </div>
        </div>
    )
}