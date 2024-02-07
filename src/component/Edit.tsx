import { ChangeEvent, useState } from "react"
import { Hookah, HookahResponse,hookahEntry } from "../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import HookahDialogContent from "./HookahDialogContent"
import { updateHookah } from "../hookahapi"


type Formprops={
    hookahdata:HookahResponse
}
const Edit=({hookahdata}:Formprops)=>{

    const[hookah,setHookah]=useState<Hookah>({
        id:0,
        name:'',
        flavour:'',
        price:0
    })
    const [open,setOpen]=useState(false)
    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        setHookah({...hookah,[event.target.name]:event.target.value})
    }

const handleClose=()=>
setOpen(false)

const handleOpen=()=>{
    setHookah({
        id:0,
        name:hookahdata.name,
        flavour:hookahdata.flavour,
        price:hookahdata.price

    })
    setOpen(true)
}
const queryClient=useQueryClient();

const {mutate}=useMutation(updateHookah,{
    onSuccess:()=>{
        queryClient.invalidateQueries(['hookahs']);

    },
    onError:(err)=>{
        console.log(err)
    }
})

const handleSave=()=>{
    const url=hookahdata.id;
    const hookahEntry:hookahEntry={hookah,url}
    mutate(hookahEntry)
    setHookah({
        id:0,
        name:'',
        flavour:'',
        price:0
    })
    setOpen(false)
}
return(
    <>
    <Button onClick={handleOpen}>Edit</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit hookah</DialogTitle>
        <HookahDialogContent hookah={hookah} handleChange={handleChange}/>
        <DialogActions>
            <Button color="error" variant="contained" onClick={handleClose}>Cancel</Button>
            <Button color="primary" variant="contained" onAuxClick={handleSave}>Save</Button>
        </DialogActions>

    </Dialog>
    
    </>
)
}
export default Edit
