import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid,GridCellParams,GridColDef } from "@mui/x-data-grid";

import { Button, Snackbar } from "@mui/material";
import  {deleteHookah, getHookahs } from "./hookahapi.ts";
import { useState } from "react";
import Confirmation from "./component/Confirmation.tsx";
import Edit from "./component/Edit.tsx";
import AddHookah from "./component/AddHookah.tsx";


 const HookahList = () => {
  
  



  const[openConfirmation,setOpenConfirmation]= useState({
    id: 0,
    name: '',
    flavour: ''
  })
  const[showSnackBar,setSnackBar]= useState(false)


  const {data,isSuccess}=useQuery({

    
    queryKey:['hookahs'],
    queryFn:getHookahs
  })
  console.log(data);

  const columns :GridColDef[]=[
    {field:'name',headerName:'name',width:200,headerClassName:'hs'},
    {field: 'flavour', headerName: 'flavour', width: 200, headerClassName: 'hs'},
    {field:'price',headerName:'price',width:200,headerClassName:'hs'},
    {field:"Edit",
  headerName:'',
  width:90,
  sortable:false,
  filterable:false,
//   renderCell:(params:GridCellParams)=>
// <Edit hookahdata={params.row}/>

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
    onClick={()=>setOpenConfirmation({
      id:params.row.id,
      name:params.row.name,
      flavour:params.row.flavour,
     

    })}
    >Delete</Button>
    <Confirmation
    open={openConfirmation?.id===params.row.id}
    name={openConfirmation?.name===params.row.name}
    flavour={openConfirmation?.flavour===params.row.flavour}
    OnClose={()=>setOpenConfirmation(false)}
    onConfirm={()=>{
        mutate(params.row.id);
        setOpenConfirmation(false)
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
      
  
     
      <DataGrid 
      columns={columns}
      rows={data}
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
export default HookahList





