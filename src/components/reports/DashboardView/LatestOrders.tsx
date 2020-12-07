import React, {useEffect, useState} from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider, Menu, MenuItem,
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
import {ConfirmationModal} from "../../ConfirmationModal";

const LatestOrders = () => {
    const [latestOrders,setLatestOrders] = useState<Array<Order>>([])
    useEffect(()=>{
        getRecentOrders().then(orders=>{
            setLatestOrders(orders)
        }).catch(error=>{

        })

    },[])

  const [changedOrder,setChangedOrder] = useState<Order>()

   useEffect(()=>{
      if(changedOrder !== undefined){
        // @ts-ignore
        $('#confirmationModalOrderChanged').modal('show')
      }
   },[changedOrder])


  return (
    <Card
    >
      <CardHeader title="Latest Orders" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order Ref
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestOrders.map((order) => (
                <TableRow
                  hover
                  key={order.orderID}
                >
                  <TableCell>
                    {order.orderID}
                  </TableCell>
                  <TableCell>
                    {order.user.username}
                  </TableCell>
                  <TableCell>
                    {order.created}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={order.orderStatus}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="dropdown">
                      <MoreVertIcon className="dropdown-toggle" type="button" id="dropdownMenu2"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                      </MoreVertIcon>

                      <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button className="dropdown-item" type="button" onClick={(event)=>setChangedOrder(order)}>Mark as delivered</button>
                      </div>
                    </div>
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
      {
        changedOrder!== undefined &&
      <ConfirmationModal order={changedOrder}/>
       }
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
