import ShowAllCard from "./components/show";
import { BrowserRouter, Routes, Route } from "react-router-dom";  
import PokemanDetails from "./components/pokemanDetails";
import { QueryClient,QueryClientProvider } from "react-query";

const queryClient = new QueryClient;  

const App = () => {  
  return(
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<ShowAllCard/>} />  
       <Route path="/pokeman" element={<PokemanDetails/>} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>      
  );      
}

export default App;
