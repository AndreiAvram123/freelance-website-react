
import {Order, OrderStatus} from "../entities/Order";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Button, CircularProgress, createStyles, makeStyles, Theme} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {updateOrder, UpdateOrderModel} from "../repositories/OrderRepository";

type Props = {
    updateOrderModel:UpdateOrderModel,
    orders :[Array<Order>,Dispatch<SetStateAction<Array<Order>>>]
}


export function ConfirmationModal(props:Props) {

    const [orders,setOrders] = props.orders
    const updateOrderModel = props.updateOrderModel

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                alignItems: 'center',
            },
            wrapper: {
                margin: theme.spacing(1),
                position: 'relative',
            },
            buttonSuccess: {
                backgroundColor: green[500],
                '&:hover': {
                    backgroundColor: green[700],
                },
            },
            fabProgress: {
                color: green[500],
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1,
            },
            buttonProgress: {
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12,
            },
        }),
    );
    const classes = useStyles();
    const [isExecutingRequest,setIsExecutingRequest] = useState(false)

    useEffect(()=>{
         setIsExecutingRequest(false)
    },[props.updateOrderModel])

    const changeOrder = () => {
        setIsExecutingRequest(true)
       updateOrder({newOrderStatus : updateOrderModel.newOrderStatus,orderID: updateOrderModel.orderID}).then(()=>{
           setIsExecutingRequest(false)
           let index  = orders.findIndex(order => order.orderID === props.updateOrderModel.orderID)
           orders[index].orderStatus = props.updateOrderModel.newOrderStatus
           let newOrdersList = [...orders]
            setOrders(newOrdersList)
           // @ts-ignore
           $('#confirmationModalOrderChanged').modal('hide')
       }).catch(error=>{
           // @ts-ignore
           $('#confirmationModalOrderChanged').modal('hide')
       })
    }


return (
    <div className="modal fade" id="confirmationModalOrderChanged" tabIndex={-1} aria-labelledby="confirmationModalOrderChanged" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Confirm</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                   Are you sure you want to mark the order number : {props.updateOrderModel.orderID} as completed?
                </div>
                <div className="modal-footer">

                    <button type="button" className="btn btn-secondary" data-dismiss="modal" disabled={isExecutingRequest}>Close</button>
                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isExecutingRequest}
                            onClick={changeOrder}
                        >
                            Confirm
                        </Button>
                        {isExecutingRequest && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}