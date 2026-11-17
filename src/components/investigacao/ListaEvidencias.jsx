
import { FileText, LockKeyhole, ChevronRight } from "lucide-react";

function ListaEvidencias({ evidencias, atual, selecionar }) {
  return (
    <section className="evidence-section">
      <div className="section-heading">
        <div>
          <span className="panel-label">MATERIAL DE INVESTIGAÇÃO</span>
          <h2>Lista de evidências</h2>
        </div>

        <span className="evidence-count">
          {String(evidencias.length).padStart(2, "0")} REGISTROS
        </span>
      </div>

      <div className="evidence-list">
        {evidencias.map((evidencia, index) => {
          const bloqueada = index !== 0;

          return (
            <button
              key={evidencia.numero}
              className={`evidence-item ${atual === index ? "selected" : ""} ${bloqueada ? "locked" : ""}`}
              onClick={() => !bloqueada && selecionar(index)}
              disabled={bloqueada}
            >
              <span className="evidence-number">{evidencia.numero}</span>

              <span className="evidence-icon">
                {bloqueada ? <LockKeyhole size={17} /> : <FileText size={18} />}
              </span>

              <span className="evidence-info">
                <strong>{evidencia.titulo}</strong>
                <small>{evidencia.descricao}</small>
                <small className="evidence-type">{evidencia.tipo}</small>
              </span>

              {bloqueada ? (
                <span className="locked-label">BLOQUEADO</span>
              ) : (
                <ChevronRight size={18} className="evidence-arrow" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ListaEvidencias;
