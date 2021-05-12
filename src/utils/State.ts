import {Dispatch, SetStateAction, useState} from "react";

export interface State<T>{}

export interface SuccessState<T> extends  State<T>{
    data:T
}

export interface ErrorState<T> extends State<T>{
    error:string
}

export interface LoadingState extends State<undefined>{

}

export function  useRequestState<T> () : [State<T>, Dispatch<SetStateAction<State<T>>>]{
    let defaultState:LoadingState  = {}
    return useState<State<T>>(defaultState)
}

export function instanceOfSuccess <T> (object: State<T>): object is SuccessState<T> {
    return 'data' in object;
}

export function successState <T> (data:T) : SuccessState<T> {
    return {data: data}
}
export function errorState <T> (error:string) : ErrorState<T>{
    return {error : error}
}