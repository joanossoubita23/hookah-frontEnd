import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HookahResponse } from "../types.ts";
import { DataGrid,GridCellParams,GridColDef } from "@mui/x-data-grid";

import { Button, Snackbar } from "@mui/material";
import { deleteHookah, getHookahs } from "../hookahapi.ts";
import { useState } from "react";
import Confirmation from "./Confirmation.tsx";

import Edit from "./Edit.tsx";
import AddHookah from "./AddHookah.tsx";



 const HookaList = () => {
  const queryClient=useQueryClient()

  const [open,setOpen]=useState(false)

  const[openConfirmation,setOpenConfirmatioin]= useState(null)
  const[showSnackBar,setSnackBar]= useState(false)

  const {mutate}=useMutation (deleteHookah,{
    onSuccess:()=>{
    
    queryClient.invalidateQueries({queryKey:['hookahs']});
    setSnackBar(true);
  },
  onError:(err)=>{
    console.error(err);
  }
  
})
  const {data,isSuccess}=useQuery({
    queryKey:['hookahs'],
    queryFn:getHookahs
  })

  const columns :GridColDef[]=[
    {field:'name',headerName:'name',width:200,headerClassName:'hs'},
    {field: 'flavour', headerName: 'name', width: 200, headerClassName: 'hs'},
    {field:'price',headerName:'price',width:200,headerClassName:'hs'},
    {field:"Edit",
  headerName:'',
  width:90,
  sortable:false,
  filterable:false,
  renderCell:(params:GridCellParams)=>
<Edit hookahdata={params.row}/>

},

{
field:"delete",
headerName:'',
  width:90,
  sortable:false,
  filterable:false,
  renderCell:(params:GridCellParams)=>(
    <>
    <Button color="error"
    onClick={()=>setOpenConfirmatioin({
      id:params.row.id,
      name:params.row.name,
      color:params.row.color,
     

    })}
    >Delete</Button>
    <Confirmation
    open={openConfirmation?.id===params.row.id}
    name={openConfirmation?.name===params.row.name}
    flavour={openConfirmation?.flavour===params.row.flavour}
    OnClose={()=>setOpenConfirmatioin(false)}
    onConfirm={()=>{
      mutate(params.row.id);
      setOpenConfirmatioin(false)
    }
    }>

    </Confirmation>
    </>

  )

}

  ]
  if(!isSuccess){
    return <h2>Loading ....</h2>

  }else{
    return(
      <>
      <AddHookah/>
      <DataGrid
      rows={data}
      columns={columns}
      sx={{
        boxShadow:2,
        border:2,
        borderColoer:'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color:'primarey.main'
        },
      }}
      />
      <Snackbar open={showSnackBar}
      autoHideDuration={2000}
      onClose={()=>setSnackBar(false)}
      message="Hookah is delete"
      style={{background:'red'}}
      />
      
      </>
    )
  }



 
}
export default HookaList
