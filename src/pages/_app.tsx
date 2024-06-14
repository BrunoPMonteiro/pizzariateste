import '../styles/globals.scss'
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Hotjar from '@hotjar/browser';

import { AuthProvider } from '@/contexts/AuthContext';

//const siteId = 5022178;
//const hotjarVersion = 6;

//Hotjar.init(siteId, hotjarVersion);

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/>
    </AuthProvider>
  ) 
}

export default App;
