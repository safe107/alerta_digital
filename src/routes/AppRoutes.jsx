import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import NomeJogador from "../pages/NomeJogador/NomeJogador";
import ComoFunciona from "../pages/ComoFunciona/ComoFunciona";
import Cenarios from "../pages/Cenarios/Cenarios";
import Jogo from "../pages/Jogo/Jogo";
import Alternativas from "../pages/Alternativas/Alternativas";
import Feedback from "../pages/Feedback/Feedback";
import Ranking from "../pages/Ranking/Ranking";
import Conclusao from "../pages/Conclusao/Conclusao";
import LoginAdmin from "../pages/Admin/LoginAdmin";
import Dashboard from "../pages/Admin/Dashboard";
import GerenciarCenarios from "../pages/Admin/GerenciarCenarios";
import GerenciarPerguntas from "../pages/Admin/GerenciarPerguntas";
import GerenciarAlternativas from "../pages/Admin/GerenciarAlternativas";
import GerenciarRanking from "../pages/Admin/GerenciarRanking";

function ProtectedAdmin({ children }) {
    if (!localStorage.getItem("adminToken")) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}


function AppRoutes(){
    return(
        <BrowserRouter> 
        <Routes>   
            <Route path="/" element ={<Home />} />
            <Route path="/jogador" element ={<NomeJogador />} />
            <Route path="/como-funciona" element ={<ComoFunciona />} />
            <Route path="/cenarios" element ={<Cenarios />} />
            <Route path="/jogo/:id" element ={<Jogo />} />
            <Route path="/jogo/:id/alternativas" element ={<Alternativas />} />
            <Route path="/feedback" element ={<Feedback />} />
            <Route path="/ranking" element ={<Ranking />} />
            <Route path="/conclusao" element={<Conclusao />} />
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/admin" element={<ProtectedAdmin><Dashboard /></ProtectedAdmin>} />
            <Route path="/admin/cenarios" element={<ProtectedAdmin><GerenciarCenarios /></ProtectedAdmin>} />
            <Route path="/admin/perguntas" element={<ProtectedAdmin><GerenciarPerguntas /></ProtectedAdmin>} />
            <Route path="/admin/alternativas" element={<ProtectedAdmin><GerenciarAlternativas /></ProtectedAdmin>} />
            <Route path="/admin/ranking" element={<ProtectedAdmin><GerenciarRanking /></ProtectedAdmin>} />
             </Routes>
        </BrowserRouter>
    );
}


export default AppRoutes;
