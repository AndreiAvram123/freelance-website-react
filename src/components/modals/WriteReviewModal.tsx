import {ChangeEvent, useEffect, useState} from "react";
import {createReview, CreateReviewModel} from "../../repositories/ReviewsRepository";
import {getUserID} from "../../utils/UserManager";
import {ProductModel} from "../../repositories/ProductRepository";

type Props ={
    product:ProductModel
}

export default function WriteReviewModal(props:Props) {

    const [currentRating,setCurrentRating] = useState(0)
    const [isFormValid,setIsCurrentValid] = useState(false)
    const [reviewText,setReviewText] = useState("")

    useEffect(()=>{
        setIsCurrentValid(currentRating>0 && reviewText.trim() !== "")
    },[reviewText,currentRating])

    const handleTextChanged = (event:ChangeEvent<HTMLTextAreaElement>) =>{
        setReviewText(event.target.value)
    }

    function handleCreateReview() {
         let creationModel:CreateReviewModel = {
             productID: props.product.productID,
             description : reviewText,
             rating: currentRating
         }
         createReview(creationModel).then(result=>{
             window.location.reload()
         }).catch(error=>{
             window.location.reload()
         })
    }


    return (
        <div className="modal fade" id="writeReviewModal" tabIndex={-1} role="dialog"
             aria-labelledby="writeReviewModalLabel"
             aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="writeReviewModalLabel">What do you think about this product?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="comment_text">Enter some text</label>
                            <textarea id="comment_text" className="form-control text-area" name="comment_text"
                                      rows={3} onChange={handleTextChanged}/>
                        </div>

                        <div className="form-group">
                            <div className="rating">
                                <input name="stars" id="e5" type="radio" onChange={()=>setCurrentRating(5)}/><label htmlFor="e5">☆</label>
                                <input name="stars" id="e4" type="radio" onChange={()=>setCurrentRating(4)}/><label htmlFor="e4">☆</label>
                                <input name="stars" id="e3" type="radio" onChange={()=>setCurrentRating(3)} /><label htmlFor="e3">☆</label>
                                <input name="stars" id="e2" type="radio" onChange={()=>setCurrentRating(2)}/><label htmlFor="e2">☆</label>
                                <input name="stars" id="e1" type="radio" onChange={()=>setCurrentRating(1)} /><label htmlFor="e1">☆</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" name="postReviewButton" className="btn btn-primary" disabled={!isFormValid} onClick={()=>handleCreateReview()}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}