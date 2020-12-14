import {ChangeEvent, useEffect, useState} from "react";
import { makeCreateCategoryCall} from "../../repositories/CategoriesRepository";



export default function AddCategoryModal() {

    const [isValid,setIsValid] = useState(false)
    const [categoryName,setCategoryName] = useState("")

    const addCategory = () =>{
        makeCreateCategoryCall({categoryName : categoryName}).then((result)=>{
            window.location.reload()
        }).catch(error=>{

        })
    }

    const handleCategoryTextChanged = (event:ChangeEvent<HTMLInputElement>)=>{
        setCategoryName(event.target.value)
    }


    useEffect(()=>{
        setIsValid(categoryName.trim().length > 0)
    },[categoryName])

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