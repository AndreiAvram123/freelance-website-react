import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {Category, ProductModel, updateProduct} from "../repositories/ProductRepository";

type ModifyProductModalProps = {
    state: [product :ProductModel,setProductModel:Dispatch<SetStateAction<ProductModel>>],
    categories:Array<Category>
}

export default function ModifyProductModal(props:ModifyProductModalProps) {

    const [product,setProduct]= props.state

    const [modifiedProduct, setModifiedProduct] = useState(product)
    const [categoryID, setCategoryID] = useState(product.category.id)

     useEffect(()=>{
         setCategoryID(product.category.id)
         setModifiedProduct(product)
     },[product])

    const handleCategoryChange = (event:ChangeEvent<HTMLSelectElement>)=>{
        let newCategory = parseInt(event.target.value)
        setCategoryID(newCategory)
    }


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
                                       value={modifiedProduct?.name}
                                       onChange={(event) => {
                                           let json = JSON.stringify(product)
                                           let newObject = JSON.parse(json) as ProductModel
                                           newObject.name = event.target.value
                                            setModifiedProduct(newObject)

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
                                           setModifiedProduct(newObject)

                                       }} />
                            </div>
                            <div className="form-group">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Category</label>
                                <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" value={product.category.id} onChange={handleCategoryChange}>
                                    {props.categories.map(category =>{
                                        return  <option value={category.id} key={category.name} selected={category.id === product.category.id}>{category.name} </option>
                                    })}
                                </select>

                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary"  onClick={()=>{

                              updateProduct(product.productID,{price:modifiedProduct.price, name:modifiedProduct.name,categoryID: categoryID}).then(data=>{
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