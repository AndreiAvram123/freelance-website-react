import React, {useContext, useEffect, useState} from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes, {func} from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip

} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Order} from "../../../entities/Order";
import {getRecentOrders} from "../../../repositories/AnalyticsRepository";
import {ProductQuantity} from "../../../pages/CartItem";
import {fetchRecentlyCreatedProducts, ProductModel} from "../../../repositories/ProductRepository";
import ModifyProductModal from "../../ModifyProductModal";
import ReactDOM from "react-dom";
import App from "../../../App";
import CategoriesContext from "../../../contexts/CategoriesContext";

const LatestProducts = () => {

  const [latestProducts,setLatestProducts] = useState<Array<ProductModel>>([])


  const [editProduct,setEditProduct] = useState<ProductModel>()

  const  categories = useContext(CategoriesContext).categories

  useEffect(()=>{
       let mounted = true
       fetchRecentlyCreatedProducts().then(data=>{
          if(mounted) {
            setLatestProducts(data)
          }
       }).catch(error=>{
         console.log(error)
       })

  },[])

  function editAction(product:ProductModel){
     setEditProduct(product)
  }
  // @ts-ignore
  return (
    <Card
    >
      <CardHeader title="Recently added products" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Product ref
                </TableCell>
                <TableCell>
                Name
                </TableCell>
                <TableCell sortDirection="desc">
                   Price
                </TableCell>
                <TableCell>
                  Stock
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestProducts.map((product) => (
                <TableRow
                  hover
                  key={product.productID}
                >
                  <TableCell>
                    {product.productID}
                  </TableCell>
                  <TableCell>
                    {product.name}
                  </TableCell>
                  <TableCell>
                    {"£" + product.price}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={product.stock}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {product.category.name}
                  </TableCell>
                  <TableCell>
                  <Button variant="contained" color="primary" data-toggle="modal" data-target="#modifyProductModal"  onClick={()=> editAction(product)}>
                    Edit
                  </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
      <div id={"container-modal"}>
        {
          editProduct &&
              //@ts-ignore
            <ModifyProductModal state={[editProduct,setEditProduct]}  categories={categories}/>
        }
      </div>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
