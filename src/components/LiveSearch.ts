import {fetchSearchSuggestions, ProductModel} from "../repositories/ProductRepository";
import {BASE_URL_IMAGES} from "../utils/ApiConstants";

let suggestionConstainer = document.createElement("div")
suggestionConstainer.setAttribute("id", "autocomplete-list");
suggestionConstainer.setAttribute("class", "autocomplete-items");


class SuggestionFactory{

    createSuggestion(product:ProductModel){
        return  new ProductSuggestion(product).suggestionView
    }
}

class ProductSuggestion{
    public suggestionView: HTMLDivElement;

    constructor(product:ProductModel) {
        let name = product.name;
        let id = product.productID;

        this.suggestionView = document.createElement("div");
        let image = document.createElement("img");
        image.className = "postSuggestionImage";
        image.src =  product.images[0].imageURl;
        this.suggestionView.append(image);

        this.suggestionView.innerHTML += name;

        /*execute a function when someone clicks on the item value (DIV element):*/
        this.suggestionView.addEventListener("click", function (e) {
            window.location.href = "/product/" + id
        });
    }
}

export function performSearch(query :string){
    if(query.trim()!== "") {
        fetchSearchSuggestions(query).then(response => {
            insertSuggestions(response.data)
        }).catch(error => {
            console.log(error)
        })
    }else{
        clearSuggestionsList()
    }
}


const suggestionFactory = new  SuggestionFactory()



function insertSuggestions(products : Array<ProductModel>){
    clearSuggestionsList()
    let searchField = document.getElementById("search-products-field");
    if(searchField?.parentNode != null){
        //insert the suggestions postsSuggestionContainer as a child in the search field
        searchField.parentNode.appendChild(suggestionConstainer);
        //insert all available suggestions
        products.forEach(product => {
            suggestionConstainer.appendChild(suggestionFactory.createSuggestion(product));
        });
    }
}

function clearSuggestionsList() {
    suggestionConstainer.innerHTML = "";
}
