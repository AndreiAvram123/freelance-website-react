import React, {useEffect, useState} from "react";
import {Category, fetchCategories} from "../repositories/ProductRepository";
import image from '../baby-yoda.jpg'
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, Typography} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

export default function Home(){

    const [categories,setCategories] = useState<Array<Category>>([])

    useEffect(()=>{
        fetchCategories().then(result=>{
            setCategories(result)
        }).catch(error=>{
            console.log(error.error)
        })
    },[])

    return (
        <div>
        <img src={image} className={"image-full-width"}/>
        <div className={"container-fluid mt-5 "}>
            <div className={"row container-categories"} >
                {
                    categories.map((category)=>{
                        return(

                            <div className={"col"}>
                            <Card className={"card-style"} onClick={()=> window.location.href ="/products?category=" + category.name}>
                                <CardActionArea >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image= {category.image.imageURl}
                                        title= {category.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {category.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            </div>
                        )
                    })

                }

            </div>
        </div>
        </div>
    )
}