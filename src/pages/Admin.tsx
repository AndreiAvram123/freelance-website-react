import {useEffect, useState} from "react";
import {createProduct} from "../repositories/ProductRepository";

export default function Admin(){
    const [productName, setProductName] = useState("")
    const [productPrice,setProductPrice] = useState(0)
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(()=>{
        setIsFormValid(productName.trim() !== "" && productPrice >0)
    },[productName,productPrice])

    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add product</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="product-name" className="col-form-label">Product name</label>
                                    <input type="text" className="form-control" id="product-name"
                                           onChange={(event)=> setProductName(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product-price" className="col-form-label">Product price</label>
                                    <input type="number" className="form-control" id="product-price"
                                     onChange={(event)=> setProductPrice(parseInt(event.target.value))}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss = "modal"
                             disabled={!isFormValid}
                             onClick={()=>{
                                createProduct(productName,productPrice)
                             }}
                            >Finish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}