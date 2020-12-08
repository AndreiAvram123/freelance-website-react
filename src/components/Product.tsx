
// @ts-ignore
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ProductModel} from '../repositories/ProductRepository'
import {BASE_URL_IMAGES} from "../utils/ApiConstants";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop: 20
    },
});

type Props ={
    product:ProductModel
}

 function Product(props : Props) {

    const classes = useStyles();

    const product = props.product

     let imageURL = "";
     if(product.images[0]?.imageURl){
       imageURL = BASE_URL_IMAGES + product.images[0].imageURl

    }
    return (
        <Card className={classes.root}
           onClick= {()=> {window.location.href = "/product/" + product.productID }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={product.name}
                    height="200"
                    image= {imageURL}
                    title= {product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        {"£" + product.price }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}
export default Product