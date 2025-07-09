import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './context/store.ts'
import { LoginStatusProvider } from './context/LoginStatusContext.tsx'
import { ChatStatusProvider } from './context/ChatBoxStatusContext.tsx'
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <LoginStatusProvider>
            <ChatStatusProvider>
                <App />
            </ChatStatusProvider>
        </LoginStatusProvider>
    </Provider>
)
