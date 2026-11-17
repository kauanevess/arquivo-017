
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Folder, ShieldCheck } from "lucide-react";

function CabecalhoCaso() {
  const navigate = useNavigate();

  return (
    <header className="case-header">
      <button className="back-button" onClick={() => navigate("/")}>
        <ArrowLeft size={16} />
        VOLTAR AO ARQUIVO
      </button>

      <div className="case-brand">
        <Folder size={18} />
        <span>ARQUIVO 017</span>
      </div>

      <div className="classified">
        <ShieldCheck size={14} />
        ACESSO AUTORIZADO
      </div>
    </header>
  );
}

export default CabecalhoCaso;
