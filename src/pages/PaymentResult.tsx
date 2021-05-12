import {useLocation} from "react-router-dom";
import {placeOrder} from "../repositories/OrderRepository";
import {useContext} from "react";
import { CartContext } from "../contexts/CartContext";
import {validatePaymentReference} from "../repositories/PaymentRepository";
import {navigateHome} from "../helpers/RouterUtils";
import {deleteCartItems} from "../components/StorageHandler";

export default function PaymentResult(){
    function useQueryParams() {
        return new URLSearchParams(useLocation().search);
    }
    let queryParams = useQueryParams()
    let success = queryParams.get("success")
    let canceled = queryParams.get("canceled")
    let productsIDs = useContext(CartContext).productsIDs
    let paymentReference= queryParams.get("referenceID")

    if(success === "true" && paymentReference != null){
        validatePaymentReference(paymentReference).then((response)=>{
            if(response.data.valid) {
                continueFlow()
            }else{
                navigateHome()
            }
        }).catch(()=>{
            navigateHome()
        })

    }

    function continueFlow(){
        if(paymentReference != null) {
            placeOrder(productsIDs, paymentReference).then(() => {
               deleteCartItems()
            }).catch(() => {

            })
        }

    }


    return (
            <div className="row">
                <div className="col-md-6 mx-auto mt-5">
                    <div className="payment">
                        <div className={success === "true" ? "payment_header-success":"payment_header-fail"}>
                            <div className="check"><i className="fa fa-check" aria-hidden="true"></i></div>
                        </div>
                            {success === "true" &&
                                <div className="content-success">
                                <h1>Payment Successful !</h1>
                                <a href="#">Go to Main Page</a>
                                </div>
                            }
                            {(success === "false" || canceled === "true") &&
                            <div className="content-fail">
                                <h1>Payment Cancelled !</h1>
                                <a href="#">Go to Main Page</a>
                            </div>
                            }

                    </div>
                </div>
            </div>
    )
}