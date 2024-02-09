import {useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react"
import { addHookah } from "../hookahapi";
//import { useMutation } from 'react-query';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import HookahDialogContent from "./HookahDialogContent";


const AddHookah = () => {
    const [hookah,setHookah]=useState<hookah>({
        id:0,
        name:'',
        flavour:'',
        price:''

    })
    const[open,setOpen]=useState(false);
    const queryClient=useQueryClient();

    const{mutate}=useMutation(addHookah,{
        onSuccess:()=>{
            queryClient.invalidateQueries(['hookahs'])
        },
        onError:(err)=>{
            console.log(err)
        }
    })
    const handleOpen =()=>{
        setOpen(true)
    }
    const handleClose=()=>
    setOpen(false)

const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
    setHookah({...hookah,[event.target.name]:event.target.value})
}
const handleSave=()=>{
    mutate(hookah)
    setHookah({
        id:0,
        name:'',
        flavour:'',
        price:''
    })

}
return (
    <>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle> New Hookah</DialogTitle>
        <HookahDialogContent hookah={hookah} handleChange={handleChange}/>
        <DialogActions>
            <Button color="error" variant="contained" onClick={handleClose}>Cancel</Button>
            <Button color="error" variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
    </Dialog>
    <Box 
    display='flex'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    padding='20px'
    >
        <Button variant="contained" onClick={handleOpen}>Add Hookah</Button>
    </Box>
    </>
)
}
export default AddHookah
