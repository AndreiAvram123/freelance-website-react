import React, {useContext} from "react";
import CategoriesContext from "../contexts/CategoriesContext";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {Avatar, Badge} from "@material-ui/core";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import CartContext from "../contexts/CartContext";
export default  function Navbar(){
    let context = useContext(CategoriesContext)
    let cartContext = useContext(CartContext)
    let useStyles = makeStyles((theme: Theme) =>
        createStyles({
            wrapperRightActions :{
                marginLeft : "auto",
                display : "flex"
            },
            basket:{
                cursor :"pointer"
            },
            avatar: {
                cursor:  "pointer"
            }
        }))

    const StyledBadge = withStyles((theme: Theme) =>
        createStyles({
            badge: {
                right: -3,
                top: 5,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '0 4px',
            },
        }),
    )(Badge);
    const classes = useStyles();
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    {
                       context.categories.map((category=>{
                           return (<li className="nav-item">
                               <a className="nav-link" href={"/products?category=" + category.name }>{category.name}</a>
                           </li>)
                       }))
                    }
                    <li className="nav-item">
                        <a className="nav-link" href={"/admin"}>Admin</a>
                    </li>
                </ul>
                <div className={classes.wrapperRightActions}>
                    <IconButton aria-label="cart" onClick={() => window.location.href = "/cart"}>
                        <StyledBadge badgeContent={cartContext.productsIDs.length} color="secondary">
                            <ShoppingCartIcon/>
                        </StyledBadge>
                    </IconButton>
                    <Avatar className={classes.avatar} alt="Remy Sharp" src={"https://robohash.org/139.162.116.133.png"}
                            onClick={() => window.location.href = "/profile"}/>
                </div>
            </div>
        </nav>
    )
}