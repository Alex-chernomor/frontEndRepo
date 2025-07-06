
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from "./redux/store.js";
// import './index.css';
// import App from './App.jsx';
// import { BrowserRouter } from 'react-router-dom';
// import { IngredientsProvider } from './context/IngredientsContext.jsx';
import { store } from './redux/store.js';

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./redux/store.js";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { IngredientsProvider } from "./context/IngredientsContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <BrowserRouter>
        <IngredientsProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </IngredientsProvider>
      </BrowserRouter>
      {/* </PersistGate> */}

//       <PersistGate persistor={persistor}>
//         <BrowserRouter>
//           <IngredientsProvider>
//             <App />
//           </IngredientsProvider>
//         </BrowserRouter>
//       </PersistGate>

    </Provider>
  </StrictMode>
);
