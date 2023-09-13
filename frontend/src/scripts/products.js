import { Get, Post, Patch, Delete } from "./apiClient";
import Axios from "./axios";

export function getProducts(){
    return Get('/api/products')
}

export function getProduct(slug){
    return Get(`/api/products/${slug}`)
}

export function searchResult(data){
    return Post(`/api/products/search`,data)
}

export function exploreGender(gender){
    return Get(`/api/products/explore/${gender}`);
}

export function exploreCategory(gender,category){
    return Get(`/api/products/explore/${gender}/${category}`);
}
