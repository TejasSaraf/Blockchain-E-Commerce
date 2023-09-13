import { Get, Post } from "./apiClient";

export function addToCart(data){
    // to reduce the quantity of the item just add negative value of the quanitity sample body is like
    // {
    //     "cartItem":{
    //         "product":"63e0f5d28b8ca331cdd49ec1",
    //         "quantity":-2
    //     }
    // }
    return Post('/api/cart/addItem',data);
}

export function removeItemFromCart(data){
    return Post('/api/cart/removeItem', data)
}

export function updateProductQuantity(data){
    return Post('/api/cart/updateQuantity',data)
}

export function getCart(){
    return Get('/api/cart')
}

export function getCartCount(){
    return Get('/api/cart/cartCount')
}

export function getSubTotal(){
    return Get('/api/cart/subTotal')
}
