
import {useState} from "react";
import {Button, CircularProgress} from "@material-ui/core";


type Props = {
    confirmationText :string,
    onConfirm:()=>void
}


export function ConfirmationModal(props:Props) {

    const [isExecutingRequest,setIsExecutingRequest] = useState(false)

    const confirm= ()=>{
         setIsExecutingRequest(true)
         props.onConfirm()
    }



return (
    <div className="modal fade" id="confirmationModalOrderChanged" tabIndex={-1} aria-labelledby="confirmationModalOrderChanged" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Confirm</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.confirmationText}
                </div>
                <div className="modal-footer">

                    <button type="button" className="btn btn-secondary" data-dismiss="modal" disabled={isExecutingRequest}>Close</button>
                    <div className={"wrapper-button-with-loading"}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isExecutingRequest}
                            onClick={confirm}
                        >
                            Confirm
                        </Button>
                        {isExecutingRequest && <CircularProgress size={24} className={"button-progress"} />}
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}