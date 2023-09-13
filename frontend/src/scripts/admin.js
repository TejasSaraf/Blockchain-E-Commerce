import { Get, Post, Patch, Delete } from "./apiClient";

export function getDashboardCount(){
    return Get('/admin/dashboard')
}

export function getUsers(){
    return Get('/admin/users')
}

export function getAllOrders(){
    return Get(`/admin/orders`)
}

export function createProduct(data){
    return Post('/admin/product/create',data);
}

export function updateProduct(slug, data){
    return Patch(`/admin/product/update/${slug}`,data);
}

export function deleteProduct(slug){
    return Delete(`/admin/product/delete/${slug}`);
}
