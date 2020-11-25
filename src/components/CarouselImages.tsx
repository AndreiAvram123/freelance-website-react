import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function CarouselImages (){

    let carouselStyle = {
        maxWidth : "60%",
        marginLeft: "10rem"
    }
    return (
        <div className={"row"}>
            <div className={"col"}>
                <div id="carouselExampleControls" className="carousel slide" style={carouselStyle}  data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="https://via.placeholder.com/300" alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://via.placeholder.com/300" alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://via.placeholder.com/300" alt="Third slide"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div className={"col"}>
                <Typography
                    variant="h3"
                >
                    Product title
                </Typography>
                <Button variant="contained" color="primary">
                    Add to basket
                </Button>
            </div>
        </div>
    )
}