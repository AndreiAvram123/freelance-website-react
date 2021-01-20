import React from 'react';
import {
  Container,
  Grid
} from '@material-ui/core';
import TotalAmount from './TotalAmount';
import LatestOrders from './LatestOrders';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';

import AddProductModal from "../../AddProductModal";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import LatestProducts from "./LatestProducts";
import AddCategoryModal from "../../modals/AddCategoryModal";
import TotalProducts from "./TotalProducts";
const Dashboard = () => {



  return (
      <Container maxWidth={false} className={"mt-4"}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalAmount />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
          >
            <TotalProducts />
          </Grid>


          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
              item
            lg={4}
            md={12}
            xl ={3}
            xs = {12}
            >
            <div className={"wrapper-button-center mt-5"}>
            <Button type="button"
                    variant="contained"
                    color={"primary"}
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#addProductModal"
                    startIcon={<AddIcon />}
            >
              Add product
            </Button>
            <AddProductModal />
            </div>
            <div className={"wrapper-button-center mt-5"}>
              <Button type="button"
                      variant="contained"
                      color={"primary"}
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#addCategoryModal"
                      startIcon={<AddIcon />}
              >
                Add Category
              </Button>
              <AddCategoryModal />
            </div>
        </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
  );
};

export default Dashboard;
