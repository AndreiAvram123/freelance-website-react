import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import CarouselImages from "../components/CarouselImages";
import {Card, CardContent, makeStyles, Paper, Snackbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {fetchProduct, ProductModel} from "../repositories/ProductRepository";
import {CartContext} from "../contexts/CartContext";
import StarIcon from '@material-ui/icons/Star';
import {fetchReviewsForProduct} from "../repositories/ReviewsRepository";
import {Review} from "../entities/Review";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {StarHalf} from "@material-ui/icons";
import CommentIcon from '@material-ui/icons/Comment';
import { v4 as uuidv4 } from 'uuid';
import WriteReviewModal from "../components/modals/WriteReviewModal";
import {Alert} from "@material-ui/lab";
import {errorState, instanceOfSuccess, successState, useRequestState} from "../utils/State";

export default function ExpandedProduct(){

    const context = useContext(CartContext)


    const [productState,setProductState] = useRequestState<ProductModel>()

    const [reviewsState,setReviewsState] = useRequestState<Array<Review>>()

    const [productRating,setProductRating] = useState(0)

    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);



    const handleClose = (event: any, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSnackbarOpen(false);
    };

    const handleAddToBasket = ()=>{
        if(instanceOfSuccess<ProductModel>(productState)){
            let product = productState.data
            context.addProduct(product.productID)
            setIsSnackbarOpen(true)
        }
    }


    useEffect(()=>{
        const productID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        if(!isNaN(Number(productID))){
            let productIDNumber = Number(productID)

            fetchProduct(productIDNumber).then((response)=>{
                setProductState(successState(response.data))
            }).catch(error=>{
                 setProductState(errorState(error))
            })

            fetchReviewsForProduct(productIDNumber).then(response=>{
              setReviewsState(successState(response.data))
            }).catch(error=>{
                 setReviewsState(errorState(error))
            })
        }
    },[])

    useEffect(()=>{
        if(instanceOfSuccess(reviewsState)) {
            let numberOfReviews = reviewsState.data.length
            if (numberOfReviews === 0) {
                setProductRating(0)
            } else {
                let totalSum = 0
                reviewsState.data.forEach(review => {
                totalSum += review.rating
            })
                setProductRating(totalSum / numberOfReviews)
        }

        }

    },[reviewsState])

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            marginTop : 20
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
            stars.push(<StarIcon key ={uuidv4()} htmlColor={"#ffd500"}/>)
        }
        if(rating %1 !==0){
            stars.push(<StarHalf key ={uuidv4() } htmlColor={"#ffd500"}/>)
        }
        for(let j=stars.length+1;j<=5;j++){
            stars.push(<StarBorderIcon  key ={uuidv4() } htmlColor={"#ffd500"}/>)
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
                        {
                            getStarsBasedOnRating(review.rating)
                        }
                    </div>
                    <Typography variant="body1" component="p" className={"mt-3"}>
                {
                    review.description
                }
                    </Typography>
            </CardContent>

        </Card>
        )
    }

    return (
        <div>

            <Snackbar anchorOrigin={{vertical : "bottom", horizontal : "center" }}
                      open={isSnackbarOpen}
                      autoHideDuration={6000}
                      onClose={handleClose}>
                <Alert onClose={() =>setIsSnackbarOpen(false)} severity="success">
                   Product added to basket
                </Alert>
            </Snackbar>

            {
                instanceOfSuccess(productState) &&
                <div>
                    <div className={"float-button-left"} data-toggle="modal"
                         data-target="#writeReviewModal">
                    <CommentIcon style={{marginTop:"17px"}} />
                    </div>
                    <WriteReviewModal product={productState.data} />
                    <div className={"row mt-5"}>
                        <div className={"col-md"}>
                            <CarouselImages images={productState.data.images }/>
                        </div>
                        <div className={"col-md"}>
                            <Typography
                                variant="h3">
                                {productState.data.name}
                            </Typography>
                            <div>
                                <div>
                                    {
                                        getStarsBasedOnRating(productRating)
                                    }
                                    <span  className={"align-middle ml-2"}>{productRating}</span>
                                </div>
                                {
                                   instanceOfSuccess(reviewsState) &&
                                    <Typography
                                        color={"secondary"}
                                        variant="subtitle1">
                                        {reviewsState.data.length} reviews
                                    </Typography>
                                }
                            </div>
                                <Typography
                                    variant="subtitle1">
                                    {productState.data.description}
                                </Typography>
                            <Typography
                                variant="subtitle1">
                                Products in stock : <span style={{color: "blue"}}>{productState.data.stock}</span>
                            </Typography>
                            <Typography>
                            </Typography>

                        </div>
                        <div className={"col-md"}>
                            <Paper elevation={1}>
                                <div style={{padding: "15px"}}>
                                    <Typography
                                        variant="h4">
                                        £{productState.data.price}
                                    </Typography>
                                    <Button variant="contained" color="primary" className={"mt-3"} onClick={handleAddToBasket}>
                                        Add to basket
                                    </Button>
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
                    {
                        instanceOfSuccess(reviewsState) &&
                        <div className={"row mt-5"}>
                            <div className={"col"}>
                                {
                                    // eslint-disable-next-line array-callback-return
                                    reviewsState.data.map((review, index) => {
                                        if (index % 3 === 0 || index === 0) {
                                            return ReviewLayout(review)
                                        }
                                    })
                                }

                            </div>
                            <div className={"col"}>
                                {
                                    // eslint-disable-next-line array-callback-return
                                    reviewsState.data.map((review, index) => {
                                        if (index % 3 === 1) {
                                            return ReviewLayout(review)
                                        }
                                    })
                                }
                            </div>
                            <div className={"col"}>
                                {
                                    // eslint-disable-next-line array-callback-return
                                    reviewsState.data.map((review, index) => {
                                        if (index % 3 === 2) {
                                            return ReviewLayout(review)
                                        }
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>

            }
        </div>
    )
}