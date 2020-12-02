import {createProduct} from "../repositories/ProductRepository";
import {useContext, useEffect, useState} from "react";
import CategoriesContext from "../contexts/CategoriesContext";

export default function AddProductModal() {

    const context = useContext(CategoriesContext)

    const [productName, setProductName] = useState("")
    const [productPrice,setProductPrice] = useState(0)
    const [images,setImages] = useState(FileList.prototype)
   const [categoryID, setCategoryID] = useState(-1)


    const [isFormValid, setIsFormValid] = useState(false)



    useEffect(()=>{
        setIsFormValid(productName.trim() !== "" && productPrice >0 && images !== FileList.prototype && categoryID !== -1)
    },[productName,productPrice,images])

        return(
    <div className="modal fade" id="addProductModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                   onChange={(event) => setProductName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="product-price" className="col-form-label">Product price</label>
                            <input type="number" className="form-control" id="product-price"
                                   onChange={(event) => setProductPrice(parseInt(event.target.value))}/>
                        </div>
                     <div className="form-group">
                         <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Category</label>
                         <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={(event)=>{
                            setCategoryID(parseInt(event.target.value))
                         }}>
                             <option selected>Choose...</option>
                             {context.categories.map(category =>{
                                 return  <option value={category.id}>{category.name}</option>
                             })}
                         </select>

                     </div>
                        <input type="file" id="product-images" multiple onChange={(event) => {
                            if (event.target.files != null) {
                                setImages(event.target.files)
                            }

                        }}/>

                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                            disabled={!isFormValid}
                            onClick={() => {
                                createProduct({productName:productName,price: productPrice,categoryID: categoryID, images:images}).then((data)=>[
                                    // @ts-ignore
                                    $('#addProductModal').modal('hide')
                                ]).catch(error =>{
                                    console.log(error)
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