

import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HookahList from './HookahList';
import AddHookah from './component/AddHookah';



const queryClient=new QueryClient();
const App = () => {
  return(
  <Container  maxWidth="xl">
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h3' style={{ textAlign: 'center', width: '100%' }}>
          Hookah Lounge 💨🇬🇦
        </Typography>
      </Toolbar>
    </AppBar>
    <QueryClientProvider client={queryClient}>
     <HookahList/>
  
    </QueryClientProvider>

  </Container>
  
  )
}

export default App
