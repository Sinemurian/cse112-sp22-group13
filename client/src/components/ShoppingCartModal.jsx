import React, {Fragment} from "react";
//import ScrollToTop from "../components/ScrollToTop";
import MockPhoto from "../media/mock-photo.jpg";
//import "../stylesheets/frontpage.css";

const ShoppingCartModal = () => {

    // TODO: replace it with Spoonacular API response?
    const cuisineMockData = [
    {
        "name": "Item 1",
        "place": "American",
        "price": 1,
    },
    {
        "name": "Item 2",
        "place": "French",
        "price": 2,
    },
    {
        "name": "Item 3",
        "place": "German",
        "price": 3,
    },
    {
        "name": "Item 4",
        "place": "Italian",
        "price": 4,
    },
    {
        "name": "Item 5",
        "place": "Jewish",
        "price": 5,
    },
    {
        "name": "Item 6",
        "place": "Portugese",
        "price": 6,
    },
    {
        "name": "Item 7",
        "place": "Japanese",
        "price": 7,
    },
    {
        "name": "Item 8",
        "place": "Vietnamese",
        "price": 8,
    },
    ];

    const ingredients = ["Beef", "Pork", "Chicken", "Tofu", "Duck", "Egg", "Milk", "Butter", "Fruits"]
    const prepTime = ["5 min", "10 min", "15 min", "30 min", "45 min", "1 hour", "2 hour"];

    return (
        <Fragment>
            <container>
                <div class="title">
                    Add to Cart
                </div>
                
                <div class="scrolling-wrapper col flex-col flex-nowrap py-2">
                    {
                        cuisineMockData.map((cuisine) => (
                            <div class="container">
                                <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-2 border-bottom">
                                
                                <div>
                                    <input type="checkbox" />
                                    <img  alt="image" width="150" height="150" src={MockPhoto}
                                    data-holder-rendered="true" />
                                </div>

                                <div>
                                    <div>
                                        {cuisine.name}
                                    </div>
                                    <div>
                                        {cuisine.place}
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-outline-primary me-2">Quantity</button>
                                        <button type="button" class="btn btn-outline-primary me-2">Delete</button>
                                        <button type="button" class="btn btn-outline-primary me-2">Save for later</button>
                                    </div>
                                </div>

                                <div class="col-md-3 text-end">
                                    Price: 
                                    {cuisine.price}
                                </div>
                    
                                </header>
                            </div>
                            
                        ))
                    }
                </div>
            </container>
        </Fragment>
    )
}


export default ShoppingCartModal;