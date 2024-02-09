import { ChangeEvent } from "react"

export type HookahResponse={
    id:number,
    name:string,
    flavour:string,
    price:number,

}

export type Hookah={
    id:number,
    name:string,
    flavour:string,
    price:number,
}

export type hookahEntry={
    hookah:HookahResponse;
    url:string;
}
export type DialogFromProps={
    hookah:HookahResponse
    handleChange:(event:ChangeEvent<HTMLInputElement>)=>void

}