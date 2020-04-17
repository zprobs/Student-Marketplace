import React, {Component} from 'react';
import {detailProduct} from "./data";
import Cookies from "universal-cookie/cjs";

const ProductContext = React.createContext();

let listings = {};

class ProductProvider extends Component {
    state={
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
        myListings: [],
        isAuth: false
    };

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        const cookie = new Cookies();
        const id = cookie.get('id');
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            listings = JSON.parse(xhr.responseText);
            let tempProducts = [];
            let myProducts = [];
            listings.forEach(item => {
                item.img = 'http://127.0.0.1:8000/media/' + item.img;
                item.inCart = false;
                item.quantity = 0;
                item.total = 0;
                const singleItem = {...item};       // Copy values to avoid manipulating data during frontend operations
                tempProducts = [...tempProducts,singleItem];
                if (item.seller__id == id) {
                    const myItem = {...item};
                    myProducts = [...myProducts,myItem];
                }

            });
            this.setState(()=> {
                return {
                    products: tempProducts,
                    myListings: myProducts,
                    cart: [],
                    isAuth: (id != undefined) ? true : false
                };
            });
        });

        xhr.open('GET', 'http://127.0.0.1:8000/listings/get/active');
        xhr.send();
    };

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
    };

    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.quantity = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=> {
            return {products: tempProducts, cart: [...this.state.cart, product]};
        }, ()=>{
            this.addTotals();
        });
    };

    openModal = id => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct: product, modalOpen: true}
        })
    };

    closeModal = () => {
        this.setState(()=>{
            return {modalOpen: false}
        })
    };

    updateListing = (event, id, field) => {
        let tempMyListings = [...this.state.myListings];
        const selectedProduct = tempMyListings.find(item=>item.id === id.id); // using id.id because id is an object
        const index = tempMyListings.indexOf(selectedProduct);
        const product = tempMyListings[index];
        product[field] = event.target.value;

        this.setState(()=>{
            return {myListings:[...tempMyListings]}
        });

    };


    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.quantity = product.quantity + 1;
        product.total = product.quantity * product.price;

        this.setState(()=>{
            return {cart:[...tempCart]}
        },()=>{
            this.addTotals();
        })

    };
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.quantity = product.quantity -1;
        if (product.quantity === 0) {
            this.removeItem(id);
        } else {
            product.total = product.quantity * product.price;
            this.setState(()=>{
                return {cart:[...tempCart]}
            },()=>{
                this.addTotals();
            })
        }
    };

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.quantity = 0;
        removedProduct.total = 0;

        this.setState(()=>{
            return {
                cart:[...tempCart], product:[...tempProducts]
            }
        }, ()=>{
            this.addTotals();
        })

    };

    removeListing = (id) => {
        const conf = window.confirm("This will delete your listing immediately. Are you sure you would like to remove it?");
        if (conf) {
            let cookie = new Cookies();
            const token = cookie.get('token');
            const xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.responseText.includes('success')) {
                    this.setProducts();
                } else {
                    alert("There was an error removing this listing: " + xhr.responseText);
                }

            });
            xhr.open('POST', 'http://127.0.0.1:8000/listings/remove/' + id + "/");
            xhr.setRequestHeader('Authorization' , 'Token ' + token);
            xhr.send();
        }
    };

    clearCart = () => {
        this.setState(()=>{
            return {cart: []};
        },()=>{
            this.setProducts();
            this.addTotals();
        })
    };

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.13;
        const tax = parseFloat(tempTax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));
        this.setState(()=>{
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal:total
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                setProducts: this.setProducts,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                clearCart: this.clearCart,
                removeItem: this.removeItem,
                removeListing: this.removeListing,
                updateListing: this.updateListing,
            }}
            >
                { this.props.children }
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
