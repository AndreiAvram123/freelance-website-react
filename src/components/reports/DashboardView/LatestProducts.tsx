import React, {useContext, useEffect, useState} from 'react';

import EditIcon from '@material-ui/icons/Edit';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider, IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow

} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {fetchProductsByPage, ProductModel, pushDeleteProduct} from "../../../repositories/ProductRepository";
import ModifyProductModal from "../../ModifyProductModal";

import {IncreaseStockModal} from "../../modals/IncreaseStockModal";
import {CategoriesContext} from "../../../contexts/CategoriesContext";
import DeleteIcon from "@material-ui/icons/Delete";
import {ConfirmationModal} from "../../ConfirmationModal";
import {CONFIRM_DELETE_PRODUCT} from "../../../utils/Messages";

const  LatestProducts = () => {

  const [latestProducts,setLatestProducts] = useState<Array<ProductModel>>([])

  const [editProduct,setEditProduct] = useState<ProductModel>()

  const [deleteProduct,setDeleteProduct] = useState<ProductModel>()

  const [productsPage,setProductsPage] = useState(1)

  const  categories = useContext(CategoriesContext).categories

  const [isRequestExecuting,setIsRequestExecuting] = useState(false)


const fetchMoreProducts = ()=>{
    if(!isRequestExecuting) {
      setIsRequestExecuting(true)
      fetchProductsByPage(productsPage).then(data => {
        setProductsPage(prevState => prevState + 1)
        setLatestProducts(prevState => prevState.concat(data))
        setIsRequestExecuting(false)
      }).catch(error => {
        setIsRequestExecuting(false)
      })
    }
}

  const performDeleteProduct = () =>{
    closeConfirmationModal()
    if(deleteProduct) {
      pushDeleteProduct(deleteProduct.productID).then((result) => {
        let index = latestProducts.findIndex(product => product.productID === deleteProduct.productID)
        setLatestProducts(prevState => {
           prevState.splice(index,1)
           return [...prevState]
        })
      }).catch((error) => {
      })
    }
     setDeleteProduct(undefined)
  }

  useEffect(()=>{
  fetchMoreProducts()
  },[])

  function closeConfirmationModal(){
    // @ts-ignore
    $('#confirmationModalOrderChanged').modal('hide')
  }

  return (
    <Card
    >
      <CardHeader title="Recently added products" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead >
              <TableRow>
                <TableCell >
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
                    <IconButton aria-label="addStock" data-toggle="modal" data-target="#modalIncreaseStock" onClick={()=>setEditProduct(product)}>
                      <EditIcon color={"primary"} />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {product.category.name}
                  </TableCell>
                  <TableCell>
                  <Button variant="contained" color="primary" data-toggle="modal" data-target="#modifyProductModal"  onClick={()=>setEditProduct(product)}>
                    Edit
                  </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                        onClick={()=>setDeleteProduct(product)}
                        data-toggle="modal"
                        data-target="#confirmationModalOrderChanged"
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                    >
                      Delete
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
            onClick={()=>fetchMoreProducts()}
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View more
        </Button>
      </Box>
      <div id={"container-modal"}>
        {
          editProduct &&
          //@ts-ignore
          <ModifyProductModal state={[editProduct, setEditProduct]}  categories={categories}/>
        }
        {editProduct &&
            //@ts-ignore
        <IncreaseStockModal stateEditProduct={[editProduct, setEditProduct]} state={[latestProducts, setLatestProducts]} />
        }
        {
          deleteProduct &&
              <ConfirmationModal confirmationText={CONFIRM_DELETE_PRODUCT(deleteProduct.productID)} onConfirm={performDeleteProduct} />
        }
      </div>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
