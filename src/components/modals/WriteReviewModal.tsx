import {useEffect, useState} from "react";

export default function WriteReviewModal() {

    const [currentRating,setCurrentRating] = useState(0)


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
                                      rows={3}/>
                        </div>

                        <div className="form-group">
                            <div className="rating"><input name="stars" id="e5" type="radio"/><label htmlFor="e5">☆</label>
                                <input name="stars" id="e4" type="radio" /><label htmlFor="e4">☆</label>
                                <input name="stars" id="e3" type="radio" /><label htmlFor="e3">☆</label>
                                <input name="stars" id="e2" type="radio" /><label htmlFor="e2">☆</label>
                                <input name="stars" id="e1" type="radio" /><label htmlFor="e1">☆</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" name="postReviewButton" className="btn btn-primary">Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}