
import tShirt from '../images/tShirt.png'

export default function Home(){

    return (
        <div>
        <div className="jumbotron">
        <h1 className="display-4">I am mercedes !!!!</h1>
        <p className="lead">This is our website and we are going to become ritch </p>
        <hr className="my-4"/>
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>
            <div className={"row container-categories"}>
                <div className={"card card-style"} >
                    <img src={tShirt} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">T-shirts</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk
                                of the card's content.</p>
                        </div>
                </div>
                <div className={"card card-style"} >
                    <img src={tShirt} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Hats</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                    </div>
                </div>
                <div className={"card card-style"} >
                    <img src={tShirt} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Vibrators</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                    </div>
                </div>
                <div className={"card card-style"} >
                    <img src={tShirt} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Noodles</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
   )
}