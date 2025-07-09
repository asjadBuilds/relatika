import { Toaster } from 'sonner'
import './App.css'
import AxiosInterceptor from './interceptors/AxiosInterceptors'
import AppRouter from './routes/AppRouter'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
function App() {
  const queryClient = new QueryClient()
  return (
    <AxiosInterceptor>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <AppRouter />
        </MantineProvider>
        <Toaster richColors />
      </QueryClientProvider>
    </AxiosInterceptor>
  )
}

export default App
