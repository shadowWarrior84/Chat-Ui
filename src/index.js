import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import ChatProvider from './context/chatProvider';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <React.StrictMode>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </React.StrictMode>
    </ChatProvider> 
  </BrowserRouter>
);


