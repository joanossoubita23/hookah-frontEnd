import axios from "axios"
import { hookah, HookahResponse, hookahEntry } from "./types";

export const getHookahs=async():Promise<HookahResponse[]>=>{
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/hookahs`)
    return response.data;
}

export const deleteHookah=async(id:number):Promise<HookahResponse>=>{
    const response=await axios.delete(`http://localhost:8080/api/v1/hookah/delete/${id}`)
    return response.data;
}

export const addHookah=async(hookah:hookah):Promise<HookahResponse>=>{
    const response=await axios.post(`http://localhost:8080/api/v1/hookah/add`,hookah,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    return response.data;
}


export const updateHookah=async(hookahEntry:hookahEntry)=>{
    const response=await axios.put(`${import.meta.env.VITE_API_URL}/${hookahEntry.url}`,hookahEntry.hookah,{
        headers:{
            'Content-Type':'application/json'
        }
      

    })
    return response.data;
}