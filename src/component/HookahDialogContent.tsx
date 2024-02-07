import { DialogContent, TextField } from "@mui/material"
import { DialogFromProps } from "../types"




const HookahDialogContent = ({hookah,handleChange}:DialogFromProps) => {
  return (
    <DialogContent>
        <TextField value={hookah.name} name="name" placeholder="name" variant="filled" onChange={handleChange}/><br/>
        <TextField value={hookah.flavour} name="flavour" placeholder="flavour" variant="filled" onChange={handleChange}/><br/>
        <TextField value={hookah.price} name="price" placeholder="price" variant="filled" onChange={handleChange}/><br/>


</DialogContent>
        
  )
}

export default HookahDialogContent