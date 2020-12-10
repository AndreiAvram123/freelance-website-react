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
import {getOrders} from "../../../repositories/AnalyticsRepository";
import {ConfirmationModal} from "../../ConfirmationModal";
import {updateOrder, UpdateOrderModel} from "../../../repositories/OrderRepository";
import {CHANGE_ORDER_STATUS} from "../../../utils/Messages";
import {v4 as uuidv4} from "uuid";



const LatestOrders = () => {

    const [latestOrders,setLatestOrders] = useState<Array<Order>>([])

    useEffect(()=>{
        fetchMoreOrders()
    },[])


    const fetchMoreOrders = ()=>{
        getOrders(currentPage).then(orders=>{
            setCurrentPage(prevState =>  prevState + 1)
            setLatestOrders(prevState => prevState.concat(orders))
        }).catch(error=>{

        })
    }

  const [changedOrder,setChangedOrder] = useState<UpdateOrderModel>()
  const [confirmationMessage,setConfirmationMessage] = useState("")
    const [currentPage,setCurrentPage] = useState(1)




    const handleChangeOrder = (order:Order,newOrderStatus:OrderStatus) =>{
      setChangedOrder({orderID :order.orderID, newOrderStatus: newOrderStatus})
      setConfirmationMessage(CHANGE_ORDER_STATUS(newOrderStatus))
   }
   const performChangeOrder = ()=>{
      if(changedOrder){
      updateOrder({newOrderStatus : changedOrder.newOrderStatus,orderID: changedOrder.orderID}).then(()=>{
       let index  = latestOrders.findIndex(order => order.orderID === changedOrder.orderID)
       latestOrders[index].orderStatus = changedOrder.newOrderStatus
       let newOrdersList = [...latestOrders]
       setLatestOrders(newOrdersList)
       // @ts-ignore
       $('#confirmationModalOrderChanged').modal('hide')
     }).catch(error=>{
       // @ts-ignore
       $('#confirmationModalOrderChanged').modal('hide')
     })
      }
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
              {
                  latestOrders.length > 0 &&
                  latestOrders.map((order) => (
                <TableRow
                  hover
                  key={uuidv4()}
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
                        <button className="dropdown-item" type="button" data-toggle="modal" data-target="#confirmationModalOrderChanged" onClick={()=>handleChangeOrder(order,OrderStatus.DELIVERED)}>Mark as delivered</button>
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
            onClick={fetchMoreOrders}
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View more
        </Button>
      </Box>
      {
        confirmationMessage.trim() !== "" &&
      <ConfirmationModal confirmationText={confirmationMessage} onConfirm={performChangeOrder}/>
       }
    </Card>
  );
};


export default LatestOrders;
