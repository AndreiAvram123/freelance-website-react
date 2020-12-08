
import {Order, OrderStatus} from "../entities/Order";
import {useEffect, useState} from "react";
import {Button, CircularProgress, createStyles, makeStyles, Theme} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {updateOrder} from "../repositories/OrderRepository";

type Props = {
    order:Order
}


export function ConfirmationModal(props:Props) {

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
    },[props.order])

    const changeOrder = () => {
        setIsExecutingRequest(true)
       updateOrder({newOrderStatus : OrderStatus.COMPLETED,orderID: props.order.orderID}).then(()=>{
           setIsExecutingRequest(false)
           // @ts-ignore
           $('#confirmationModalOrderChanged').modal('hide')
           window.location.reload()
       }).catch(error=>{
           // @ts-ignore
           $('#confirmationModalOrderChanged').modal('hide')
           window.location.reload()
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
                   Are you sure you want to mark the order number : {props.order.orderID} as completed?
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