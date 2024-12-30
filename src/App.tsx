import ShowAllCard from "./components/show";
import { BrowserRouter, Routes, Route } from "react-router-dom";  
import PokemanDetails from "./components/pokemanDetails";

const App = () => {  
  return(
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<ShowAllCard/>} />  
       <Route path="/pokeman" element={<PokemanDetails/>} />
      </Routes>
    </BrowserRouter>
     
  );      
}

export default App;
