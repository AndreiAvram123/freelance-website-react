import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {Avatar, Badge} from "@material-ui/core";
import React, {useContext} from "react";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import CartContext from "../contexts/CartContext";


export default function RightActionsToolbar() {
    const context = useContext(CartContext)
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
    <div className={classes.wrapperRightActions}>
        <IconButton aria-label="cart" onClick={() => window.location.href = "/cart"}>
            <StyledBadge badgeContent={context.productsIDs.length} color="secondary">
                <ShoppingCartIcon/>
            </StyledBadge>
        </IconButton>
        <Avatar className={classes.avatar} alt="Remy Sharp" src={"https://robohash.org/139.162.116.133.png"}
                onClick={() => window.location.href = "/profile"}/>
    </div>
    )
}