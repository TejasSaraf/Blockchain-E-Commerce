import { Get, Post, Patch, Delete } from "./apiClient";

export function placeOrder(data){
    return Post('/api/orders',data);
}

export function getOrders(){
    return Get('/api/orders')
}

export function getBalance(){
    return Get('/api/orders/get/balance')
}