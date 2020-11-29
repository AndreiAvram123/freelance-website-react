import React from "react";
import AddProductModal from "../components/AddProductModal";

export default function Admin(){

    return (

        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
               Add product
            </button>
            <AddProductModal/>

        </div>)
}