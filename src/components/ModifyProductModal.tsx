import React from "react";
import {ProductModel, updateProduct} from "../repositories/ProductRepository";

type ModifyProductModalProps = {
    product:ProductModel
}

export default function ModifyProductModal(props:ModifyProductModalProps) {
    let product = props.product

    return(
        <div className="modal fade" id="modifyProductModal" tabIndex={-1} aria-labelledby="modifyProductModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modify product</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="product-name" className="col-form-label">Product name</label>
                                <input type="text" className="form-control" id="product-name"
                                       defaultValue={product.name}
                                       onChange={(event) => {
                                           product.name = event.target.value
                                       }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="product-price" className="col-form-label">Product price</label>
                                <input type="number" className="form-control" id="product-price" defaultValue={product.price}
                                       onChange={(event) => {
                                           product.price = parseFloat(event.target.value)
                                       }} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary"  onClick={()=>{
                              updateProduct(product.productID,{price:product.price, name:product.name}).then(data=>{
                                   window.location.reload()
                                  }
                              ).catch(error=>{

                              })
                        }}
                        >Finish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}