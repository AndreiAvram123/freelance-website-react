import {increaseStock, ProductModel} from "../../repositories/ProductRepository";
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";


type Props = {
    stateEditProduct: [product :ProductModel,setProductModel:Dispatch<SetStateAction<ProductModel>>],
    state: [Array<ProductModel>,Dispatch<SetStateAction<Array<ProductModel>>>]
}
export function IncreaseStockModal(props:Props){

      const [latestProducts,setLatestProducts] = props.state
      const [editProduct,setEditProduct] = props.stateEditProduct

     const [productStock,setProductStock] = useState(editProduct.stock)

    useEffect(()=>{
        setProductStock(editProduct.stock)
    },[editProduct])


    const handleStockValueChanged = (event :ChangeEvent<HTMLInputElement>) =>{
          setProductStock(parseInt(event.target.value))
    }
    const handleIncreaseStock = () =>{
          increaseStock(editProduct.productID,productStock).then(result=>{
              let index = latestProducts.findIndex(predicate=>predicate.productID === editProduct.productID)
              latestProducts[index].stock = productStock
              setLatestProducts([...latestProducts])
              // @ts-ignore
              $('#modalIncreaseStock').modal('hide')
          }).catch(error=>{
              // @ts-ignore
              $('#modalIncreaseStock').modal('hide')
          })
    }


    return(
        <div className="modal fade" id="modalIncreaseStock" tabIndex={-1} role="dialog"
             aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="product-stock" className="col-form-label">New stock</label>
                            <input type="number" className="form-control" id="product-stock"
                                   onChange={handleStockValueChanged}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>handleIncreaseStock()}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
