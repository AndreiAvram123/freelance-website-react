
import {loadStripe} from "@stripe/stripe-js/pure";
import {Button, CircularProgress} from "@material-ui/core";
import {fetchSessionID} from "../repositories/PaymentRepository";
import React, {useContext, useEffect, useState} from "react";
import {ProductQuantity} from "./CartItem";
import {fetchProduct} from "../repositories/ProductRepository";
import {CartContext} from "../contexts/CartContext";
import {countriesList} from "../entities/CountriesList";

export default function Checkout(){

    const stripePromise = loadStripe("pk_test_51IAupoDmEtsgvPpENLIxFZtKfI6tMlKSWvjsApqV1Ec6CIPv5rQfl2Peol02iCLDfQLJPRMUvtd1H8OP329gYD3Z00WzkWJJax");

    const [checkoutInProgress,setIsCheckoutInProgress] = useState(false)
    const[isFetchingInitialData,setIsFetchingInitialData] = useState(true)

    const [isFormValid,setIsFormValid] = useState(false)

    const [fullName,setFullName] = useState("")
    const [validationErrorFullName,setValidationErrorFullName] = useState<string>()


    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [postCode, setPostcode] = useState("")
    const[country,setCountry] = useState("Select")

   const [calledFirstTime,setCalledFirstTime] = useState(false)

    useEffect(()=>{
        if(!calledFirstTime){
            setCalledFirstTime(true)
            return
        }

        setIsFormValid(true)
        setValidationErrorFullName(undefined)

        if(fullName.length === 0){
            setIsFormValid(false)
            setValidationErrorFullName("Fuck you")
        }


        if(address.length ===0){
            setIsFormValid(false)
        }
        if(city.length === 0){
            setIsFormValid(false)
        }
        if(country === "Select"){
            setIsFormValid(false)
        }
        if(postCode.length === 0){
            setIsFormValid(false)
        }

    },[fullName,address,city,postCode,country])


     async function startPaymentFlow (){
         setIsCheckoutInProgress(true)
         fetchSessionID(
             {itemsIDs: productsIDs}).then((response)=>{
             if(response.data?.id){
                 presentPaymentCheckout(response.data.id)
             }
         }).catch(e => {
            console.log(e)
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

    const productsIDs = context.productsIDs


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
            promises.push(fetchProduct(parseInt(key)).then(response=>{
                let productQuantity:ProductQuantity={
                    product:response.data,
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
                  <input type="text" className={validationErrorFullName ? "form-control is-invalid" : "form-control"} id="full_name_id" name="full_name"
                          aria-describedby={"validation-fullname"}
                          placeholder="John Deer"

                          onChange = {(event)=> setFullName(event.target.value)}

                   />
                  <div id="validation-fullname" className="invalid-feedback">
                       Please fill this
                  </div>
              </div>

              <div className="form-group">
                  <label htmlFor="street1_id" className="control-label">Street Address</label>
                  <input type="text" className="form-control" id="street1_id" name="street1"
                         placeholder="Street address, P.O. box, company name, c/o" onChange={(event)=>
                      setAddress(event.target.value)
                  }/>
              </div>

              <div className="form-group">
                  <label htmlFor="city_id" className="control-label">City</label>
                  <input type="text" className="form-control" id="city_id" name="city" placeholder="Smallville"
                    onChange = {(event)=> setCity(event.target.value) }
                  />
              </div>

              <div className="form-group">
                  <label htmlFor="state_id" className="control-label">Country</label>
                  <select className="form-control" id="state_id" onChange ={(event)=> setCountry(event.target.value)}>
                    <option value = "Select">Select</option>
                      {
                          countriesList.map(country =>{
                              return (<option value={country}>{country}</option> )
                          })
                      }
                  </select>
              </div>

              <div className="form-group">
                  <label htmlFor="zip_id" className="control-label">Zip Code</label>
                  <input type="text" className="form-control" id="zip_id" name="zip" placeholder="#####" onChange={event => setPostcode(event.target.value)}/>
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