import React, {useContext, useEffect, useState} from "react";
import CarouselImages from "../components/CarouselImages";
import {Card, CardContent, makeStyles, Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {fetchProduct, ProductModel} from "../repositories/ProductRepository";
import {CartContext} from "../contexts/CartContext";
import {ApiError} from "../repositories/CallRunner";
import StarIcon from '@material-ui/icons/Star';
import {fetchReviewsForProduct} from "../repositories/ReviewsRepository";
import {Review} from "../entities/Review";
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {StarHalf} from "@material-ui/icons";

export default function ExpandedProduct(){

    const context = useContext(CartContext)

    const [product, setProduct] = useState<ProductModel>()
    const [reviews,setReviews] = useState<Array<Review>>([])
    const [productRating,setProductRating] = useState(0)


    useEffect(()=>{
        const productID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        if(!isNaN(Number(productID))){
            let productIDNumber = Number(productID)
            fetchProduct(productIDNumber).then((result)=>{
               setProduct(result)
            }).catch(error=>{
                if (error instanceof ApiError) {
                    console.log(error)
                }
            })
            fetchReviewsForProduct(productIDNumber).then(result=>{
              setReviews(result)
            }).catch(error=>{

            })
        }
    },[])

    useEffect(()=>{
        let total = 0
        reviews.forEach(review=>{
            total += review.rating
        })
        setProductRating(total/reviews.length)

    },[reviews])

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

    function getStarsBasedOnRating(rating:number){
        let stars = []
        for(let i =1; i <= rating;i++) {
            stars.push(<StarIcon htmlColor={"#ffd500"}/>)
        }
        if(rating %1 !==0){
            stars.push(<StarHalf htmlColor={"#ffd500"}/>)
        }
        for(let j=stars.length+1;j<=5;j++){
            stars.push(<StarBorderIcon htmlColor={"#ffd500"}/>)
        }
        return stars
    }

    const ReviewLayout = (review:Review)=> {

        return(
        <Card className={classes.root} key={review.id}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {review.created}
                </Typography>
                <Typography variant="h5" component="h2">
                    Andrei Avram
                </Typography>
                <div>
                    {getStarsBasedOnRating(review.rating)}
                </div>
                <Typography variant="body2" component="p" className={"mt-3"}>
                    {review.description}
                </Typography>
            </CardContent>

        </Card>
        )
    }

    return (
        <div>
            {
                product &&

                <div>
                    <div className={"row mt-5"}>
                        <div className={"col-md"}>
                            <CarouselImages images={product.images }/>
                        </div>
                        <div className={"col-md"}>
                            {product &&
                            <Typography
                                variant="h3">
                                {product?.name}
                            </Typography>
                            }
                            <div>
                                <div>
                                    {
                                        getStarsBasedOnRating(productRating)
                                    }
                                    <span  className={"align-middle ml-2"}>{productRating}</span>
                                </div>

                                <Typography
                                    color={"primary"}
                                    variant="subtitle1">
                                    {reviews.length} reviews
                                </Typography>
                            </div>
                            {
                                product &&
                                <Typography
                                    variant="subtitle1">
                                    {product.description}
                                </Typography>

                            }
                            <Typography
                                variant="subtitle1">
                                Products in stock : <span style={{color: "blue"}}>{product?.stock}</span>
                            </Typography>
                            <Typography>
                            </Typography>

                        </div>
                        <div className={"col-md"}>
                            <Paper elevation={1}>
                                <div style={{padding: "15px"}}>
                                    <Typography
                                        variant="h4">
                                        £{product?.price}
                                    </Typography>
                                    {product &&
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
                        variant="h4"
                        className={"mt-5"}
                        style={{margin: "auto"}}
                    >
                        Reviews
                    </Typography>

                    <div className={"row mt-5"}>
                        <div className={"col"}>
                            {
                                // eslint-disable-next-line array-callback-return
                                reviews.map((review, index) => {
                                    if (index % 3 === 0 || index === 0) {
                                        return ReviewLayout(review)
                                    }
                                })
                            }

                        </div>
                        <div className={"col"}>
                            {
                                // eslint-disable-next-line array-callback-return
                                reviews.map((review, index) => {
                                    if (index % 3 === 1) {
                                        return ReviewLayout(review)
                                    }
                                })
                            }
                        </div>
                        <div className={"col"}>
                            {
                                // eslint-disable-next-line array-callback-return
                                reviews.map((review, index) => {
                                    if (index % 3 === 2) {
                                        return ReviewLayout(review)
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}