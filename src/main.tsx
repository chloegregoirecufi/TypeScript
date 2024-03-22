import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { SessionContextProvider } from './contexts/SessionContext.tsx'
import AppRouter from './routers/AppRouter.tsx'
import { Provider } from 'react-redux'
import store from './Redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>{/*context d'auth */}
      <SessionContextProvider>{/*context de session */}
        <Provider store={store}>{/*acces au store de redux */}
          <AppRouter />{/*l'application */}
        </Provider>
      </SessionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
