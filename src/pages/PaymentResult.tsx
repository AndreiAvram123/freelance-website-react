import {useLocation} from "react-router-dom";

export default function PaymentResult(){
    function useQueryParams() {
        return new URLSearchParams(useLocation().search);
    }
    let queryParams = useQueryParams()
    let success = queryParams.get("success")
    let canceled = queryParams.get("canceled")

    if(success === "true"){
        localStorage.clear()
    }

    return (
            <div className="row">
                <div className="col-md-6 mx-auto mt-5">
                    <div className="payment">
                        <div className={success === "true" ? "payment_header-success":"payment_header-fail"}>
                            <div className="check"><i className="fa fa-check" aria-hidden="true"></i></div>
                        </div>
                            {success === "true" &&
                                <div className="content-success">
                                <h1>Payment Successful !</h1>
                                <a href="#">Go to Home</a>
                                </div>
                            }
                            {(success === "false" || canceled === "true") &&
                            <div className="content-fail">
                                <h1>Payment failed !</h1>
                                <a href="#">Go to Home</a>
                            </div>
                            }

                    </div>
                </div>
            </div>
    )
}