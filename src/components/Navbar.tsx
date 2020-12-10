import React, {useContext} from "react";
import {CategoriesContext} from "../contexts/CategoriesContext";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge, Button} from "@material-ui/core";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import {CartContext} from "../contexts/CartContext";
import {isUserAdmin, isUserLoggedIn, signOut} from "../utils/UserManager";


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
                cursor :"pointer",
                marginRight : "10px"
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

    const handleSignIn = ()=>{
        window.location.href = "/login"
    }

    const handleSignOut = () =>{
        signOut()
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active" key = {"Home"}>
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    {
                       context.categories.map((category=>{
                           return (<li className="nav-item" key={category.name}>
                               <a className="nav-link" href={"/products?category=" + category.name }>{category.name}</a>
                           </li>)
                       }))
                    }
                    {
                        isUserAdmin() &&
                        <li className="nav-item" key={"Dashboard"}>
                            <a className="nav-link" href={"/dashboard"}>Dashboard</a>
                        </li>
                    }
                </ul>
                <div className={classes.wrapperRightActions}>
                    <IconButton aria-label="cart" className={classes.basket} onClick={() => window.location.href = "/cart"}>
                        <StyledBadge badgeContent={cartContext.productsIDs.length} color="secondary">
                            <ShoppingCartIcon/>
                        </StyledBadge>
                    </IconButton>
                    {
                        isUserLoggedIn() &&
                        <Button  size = "small" variant="contained" color="primary" onClick={handleSignOut} >
                           Log out
                        </Button>
                    }
                    {
                        !isUserLoggedIn() &&
                        <Button size = "medium" variant="contained" color="primary" onClick={handleSignIn}>
                            Sign in
                        </Button>
                    }

                </div>
            </div>
        </nav>
    )
}