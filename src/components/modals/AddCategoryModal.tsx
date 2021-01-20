import {ChangeEvent, useEffect, useState} from "react";
import { makeCreateCategoryCall} from "../../repositories/CategoriesRepository";
import {resizeImage} from "../../utils/ImageUtils";



export default function AddCategoryModal() {

    const [isValid,setIsValid] = useState(false)
    const [categoryName,setCategoryName] = useState("")
    const [images,setImages] = useState(FileList.prototype)

    const addCategory = async () =>{
        let imageData = await resizeImage(images[0])
        makeCreateCategoryCall({categoryName : categoryName,imageData:imageData}).then((result)=>{
            window.location.reload()
        }).catch(error=>{

        })
    }

    const handleCategoryTextChanged = (event:ChangeEvent<HTMLInputElement>)=>{
        setCategoryName(event.target.value)
    }


    useEffect(()=>{
        setIsValid(categoryName.trim().length > 0 &&
        images !== FileList.prototype)
    },[categoryName, images])

    return (
        <div className="modal fade" id="addCategoryModal" tabIndex={-1} aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Category</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="category-name" className="col-form-label">Category name</label>
                            <input type="text" className="form-control" id="category-name" onChange={handleCategoryTextChanged}/>
                        </div>
                        <input type="file" id="product-images"  onChange={(event) => {
                            if (event.target.files != null) {
                                setImages(event.target.files)
                            }

                        }}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" disabled={!isValid} onClick={()=> addCategory() }>Finish</button>
                    </div>
                </div>
            </div>
        </div>

    )
}