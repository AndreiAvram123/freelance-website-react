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
        <div className={"container mt-5 "}>
            <div className={"row"}>
                <div className="col-md-12">
                    <div className="jumbotron">
                        <h2 className="h2-responsive">Welcome to our website</h2>
                        <hr/>
                            <p className={"mt-5"}>We have items made by our artists</p>
                                <p>Click on one of the categories below to check the products</p>

                       </div>
                </div>
            </div>
             <div className={"row"}>
                 <div className = {"col"}>
                     <Typography variant="h4" component="h2">
                         Categories
                     </Typography>
                 </div>

             </div>
           
            <div className={"row container-categories mt-5"} >

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
    )
}