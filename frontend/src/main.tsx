import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
export const authService="http://localhost:5000";
///api/auth/login
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/AppContext.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="782402135436-gfmqhiu01bnc30ns6b2eq0a9m0r34dv1.apps.googleusercontent.com">
     <AppProvider>
       <App />
     </AppProvider>
    </GoogleOAuthProvider>;
  </StrictMode>
)
