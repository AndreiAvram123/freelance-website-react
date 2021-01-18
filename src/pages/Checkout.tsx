
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from "@stripe/react-stripe-js";
import {Button} from "@material-ui/core";
import {fetchSessionID} from "../repositories/PaymentRepository";
import {useState} from "react";
import {func} from "prop-types";

export default function Checkout(){

    //first check if all the items are still available
    const stripePromise = loadStripe("pk_test_51IAupoDmEtsgvPpENLIxFZtKfI6tMlKSWvjsApqV1Ec6CIPv5rQfl2Peol02iCLDfQLJPRMUvtd1H8OP329gYD3Z00WzkWJJax");


     async function startPaymentFlow (){

         fetchSessionID().then((response)=>{
             if(response.data?.id){
                 presentPaymentCheckout(response.data.id)
             }
         })
     }

     async function presentPaymentCheckout(sessionID:string){
         const stripe = await stripePromise
         if(stripe != null) {
             const paymentResult = await stripe.redirectToCheckout({
                 sessionId: sessionID
             })
             if(paymentResult.error){
                 console.log(paymentResult.error.message)
             }else{
                 console.log("uuuuuu")
             }

         }
     }

  return(
      <Button variant="contained" color="primary" onClick={startPaymentFlow}>
          Pay
      </Button>
  )
}