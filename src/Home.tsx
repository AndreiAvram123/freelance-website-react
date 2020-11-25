
import React, {useEffect, useState} from "react";
import {fetchRecentProducts, ProductModel} from "./repositories/ProductRepository";
import Product from "./components/Product";
import Toolbar from "@material-ui/core/Toolbar";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import SideDrawer from "./components/SideDrawer";

export default  function Home () {

    const [products,setProducts] = useState(new Array<JSX.Element>())
    const  [list1, setList1] = useState(new Array<JSX.Element>())
    const [list2, setList2] = useState(new Array<JSX.Element>())
    const [list3, setList3] = useState(new Array<JSX.Element>())

  //
  // useEffect(()=>{
  //     fetchRecentProducts().then(result => {
  //         console.log(result)
  //         if(result.error === "") {
  //             let products = result.data
  //             let mappedProducts = products.map(product => <Product
  //                 key={product.id}
  //                 price={product.price}
  //                 id={ product.id}
  //                 name={product.name}
  //                 image={product.image}
  //             />)
  //             setProducts(mappedProducts)
  //         }
  //     }).catch(error=> {
  //         console.log(error)
  //     })
  // },[])

    //
    // useEffect(() => {
    //     let tempList1:JSX.Element[] = []
    //     let tempList2 :JSX.Element[]= []
    //     let tempList3:JSX.Element[] = []
    //
    //     products.forEach((product, index) => {
    //         if (index % 3 === 0) {
    //             tempList3.push(product)
    //         }
    //         if (index % 3 === 1) {
    //             tempList1.push(product)
    //         }
    //         if (index % 3 === 2) {
    //             tempList2.push(product)
    //         }
    //
    //         setList1(tempList1)
    //         setList2(tempList2)
    //         setList3(tempList3)
    //     })
    // }, [products])


    const drawerWidth = 240;
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                zIndex: theme.zIndex.drawer + 1,
            },
            drawer: {
                width: drawerWidth,
                flexShrink: 0,
            },
            drawerPaper: {
                width: drawerWidth,
            },
            drawerContainer: {
                overflow: 'auto',
            },
            content: {
                flexGrow: 1,
                padding: theme.spacing(3),
            },
            root: {
                flexGrow: 1,
            },
            paper: {
                height: 140,
                width: 100,
            },
            control: {
                padding: theme.spacing(2),
            }
        }),
    );
    const classes = useStyles();

    return (
        <div style={{display:"flex"}}>
            <SideDrawer />
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Freelance website
                    </Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.content} id={"drawer-content"}>
                <Toolbar />
                <div className={"row"}>
                  <div className={"col"}>{list1}</div>
                    <div className={"col"}>{list2}</div>
                    <div className={"col"}>{list3}</div>
                </div>
            </main>
        </div>
    );
}