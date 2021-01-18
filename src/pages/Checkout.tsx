
import {loadStripe} from "@stripe/stripe-js/pure";
import {Button, CircularProgress} from "@material-ui/core";
import {fetchSessionID} from "../repositories/PaymentRepository";
import {blue} from "@material-ui/core/colors";
import React, {useContext, useEffect, useState} from "react";
import {ProductQuantity} from "./CartItem";
import {fetchProduct} from "../repositories/ProductRepository";
import {CartContext} from "../contexts/CartContext";

export default function Checkout(){


    //first check if all the items are still available
    const stripePromise = loadStripe("pk_test_51IAupoDmEtsgvPpENLIxFZtKfI6tMlKSWvjsApqV1Ec6CIPv5rQfl2Peol02iCLDfQLJPRMUvtd1H8OP329gYD3Z00WzkWJJax");

    const [checkoutInProgress,setIsCheckoutInProgress] = useState(false)
    const[isFetchingInitialData,setIsFetchingInitialData] = useState(true)

    const [isFormValid,setIsFormValid] = useState(false)

     async function startPaymentFlow (){
         setIsCheckoutInProgress(true)
         fetchSessionID({amount :  totalPrice}).then((response)=>{
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
             }
         }

    }
    const context = useContext(CartContext)

    const productsIDs =context.productsIDs


    const [totalPrice ,setTotalPrice] = useState(0)

    useEffect(()=>{
        let record : {[productID:number]: number} = {}
        let tempPrice = 0

        productsIDs.forEach((id)=>{
            if(record[id] === undefined){
                record[id] = 0
            }
            record[id] ++
        })
        let promises = []
        for (let key in record){
            promises.push(fetchProduct(parseInt(key)).then(result=>{
                let productQuantity:ProductQuantity={
                    product:result,
                    quantity : record[key]
                }
                tempPrice += (productQuantity.quantity * productQuantity.product.price)
            }).catch(error=>{
                console.log(error)
            }))
        }
        Promise.all(promises).then(()=>{
            setTotalPrice(tempPrice)
            setIsFetchingInitialData(false)
        })

    },[productsIDs])





    return(
      <div className={"row"}>
          <div className={"col"}>
          <form>
              <div className="form-group mt-5">
                  <label htmlFor="full_name_id" className="control-label">Full Name</label>
                  <input type="text" className="form-control" id="full_name_id" name="full_name"
                         placeholder="John Deer"/>
              </div>

              <div className="form-group">
                  <label htmlFor="street1_id" className="control-label">Street Address 1</label>
                  <input type="text" className="form-control" id="street1_id" name="street1"
                         placeholder="Street address, P.O. box, company name, c/o"/>
              </div>

              <div className="form-group">
                  <label htmlFor="street2_id" className="control-label">Street Address 2</label>
                  <input type="text" className="form-control" id="street2_id" name="street2"
                         placeholder="Apartment, suite, unit, building, floor, etc." />
              </div>

              <div className="form-group">
                  <label htmlFor="city_id" className="control-label">City</label>
                  <input type="text" className="form-control" id="city_id" name="city" placeholder="Smallville" />
              </div>

              <div className="form-group">
                  <label htmlFor="state_id" className="control-label">State</label>
                  <select className="form-control" id="state_id">
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                  </select>
              </div>

              <div className="form-group">
                  <label htmlFor="zip_id" className="control-label">Zip Code</label>
                  <input type="text" className="form-control" id="zip_id" name="zip" placeholder="#####"/>
              </div>

          </form>
          </div>
           <div className={"col ml-5 mt-5"}>
                      <div className="card card-body">
                          <p className="mb-1">Total Items</p>
                          <h4 className=" mb-3 txt-right">{productsIDs.length}</h4>
                          <p className="mb-1">Total Payment</p>
                          <h3 className="m-0 txt-right">{"£" + totalPrice}</h3>
                          <hr className="my-4"/>
                          <div className="text-center">
                              <div className={"wrapper-button-with-loading"}>
                                  <Button
                                      variant="contained"
                                      color="primary"
                                      disabled={checkoutInProgress || isFetchingInitialData || !isFormValid}
                                      onClick={startPaymentFlow}
                                  >
                                      Confirm
                                      {checkoutInProgress && <CircularProgress size={24} className={"button-progress"}/>}
                                  </Button>

                              </div>
                          </div>
                          </div>

                      </div>

          </div>
  )
}