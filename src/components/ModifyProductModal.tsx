import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {ProductModel, updateProduct} from "../repositories/ProductRepository";

type ModifyProductModalProps = {
    product: ProductModel
}

export default function ModifyProductModal(props:ModifyProductModalProps) {

    const product= props.product

    const [newProduct, setNewProduct] = useState(product)

    useEffect(()=>{
        setNewProduct(product)
    },[product])


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
                                <input type="text" className="form-control" id="product-name" required={true}
                                       value={newProduct?.name}
                                       onChange={(event) => {
                                           let json = JSON.stringify(product)
                                           let newObject = JSON.parse(json) as ProductModel
                                           newObject.name = event.target.value
                                            setNewProduct(newObject)

                                       }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="product-price" className="col-form-label">Product price</label>
                                <input type="number" className="form-control" id="product-price" defaultValue={product.price}
                                       onChange={(event) => {
                                           let json = JSON.stringify(product)
                                           let newObject = JSON.parse(json) as ProductModel
                                           newObject.price = parseFloat(event.target.value)
                                           setNewProduct(newObject)

                                       }} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary"  onClick={()=>{

                              updateProduct(product.productID,{price:newProduct.price, name:newProduct.name}).then(data=>{
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