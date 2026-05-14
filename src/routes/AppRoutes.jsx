import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import NomeJogador from "../pages/NomeJogador/NomeJogador";
import ComoFunciona from "../pages/ComoFunciona/ComoFunciona";
import Cenarios from "../pages/Cenarios/Cenarios";
import Jogo from "../pages/Jogo/Jogo";
import Feedback from "../pages/Feedback/Feedback";
import Ranking from "../pages/Ranking/Ranking";
import Conclusao from "../pages/Conclusao/Conclusao";


function AppRoutes(){
    return(
        <BrowserRouter> 
        <Routes>   
            <Route path="/" element ={<Home />} />
            <Route path="/jogador" element ={<NomeJogador />} />
            <Route path="/como-funciona" element ={<ComoFunciona />} />
            <Route path="/cenarios" element ={<Cenarios />} />
            <Route path="/jogo/:id" element ={<Jogo />} />
            <Route path="/feedback" element ={<Feedback />} />
            <Route path="/ranking" element ={<Ranking />} />
            <Route path="/conclusao" element={<Conclusao />} />
             </Routes>
        </BrowserRouter>
    );
}


export default AppRoutes;
