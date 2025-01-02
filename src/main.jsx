// import React from "react";
// import ReactDOM from "react-dom/client";
// import { App } from "./App.jsx";
// import "./index.css";
// import {  QueryClientProvider } from "@tanstack/react-query";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App"; // Assuming App is your root component
import "./index.css";

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
