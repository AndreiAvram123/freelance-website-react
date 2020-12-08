import React, {useEffect, useState} from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
import {Order, OrderStatus} from "../../../entities/Order";
import {getRecentOrders} from "../../../repositories/AnalyticsRepository";
import {ConfirmationModal} from "../../ConfirmationModal";
import {UpdateOrderModel} from "../../../repositories/OrderRepository";

const LatestOrders = () => {
    const [latestOrders,setLatestOrders] = useState<Array<Order>>([])
    useEffect(()=>{
        getRecentOrders().then(orders=>{
            setLatestOrders(orders)
        }).catch(error=>{

        })

    },[])

  const [changedOrder,setChangedOrder] = useState<UpdateOrderModel>()

const handleChangeOrder = (order:Order,newOrderStatus:OrderStatus) =>{
      setChangedOrder({orderID :order.orderID, newOrderStatus: newOrderStatus})
   }

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
                        <button className="dropdown-item" type="button" data-toggle="modal" data-target="#confirmationModalOrderChanged" onClick={()=>handleChangeOrder(order,OrderStatus.COMPLETED)}>Mark as delivered</button>
                        <button className="dropdown-item" type="button" data-toggle="modal" data-target="#confirmationModalOrderChanged" onClick={()=>handleChangeOrder(order,OrderStatus.PENDING)}>Mark as pending</button>
                        <button className="dropdown-item" type="button" data-toggle="modal" data-target="#confirmationModalOrderChanged" onClick={()=>handleChangeOrder(order,OrderStatus.REFUNDED)}>Mark as refunded</button>
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
      <ConfirmationModal updateOrderModel={changedOrder} orders={[latestOrders,setLatestOrders]}/>
       }
    </Card>
  );
};


export default LatestOrders;
