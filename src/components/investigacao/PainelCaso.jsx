
import { FileSearch, Clock3, Paperclip } from "lucide-react";

function PainelCaso({ evidencia }) {
  return (
    <section className="case-panel">
      <div className="panel-topline">
        <span>VISUALIZADOR DE EVIDÊNCIAS</span>
        <span>DOC. {evidencia.numero}</span>
      </div>

      <article className="document">
        <div className="document-stamp">ARQUIVO CONFIDENCIAL</div>

        <div className="document-meta">
          <span>CASO 001</span>
          <span>REGISTRO INTERNO</span>
        </div>

        <p className="document-kicker">{evidencia.tipo}</p>

        <h2>{evidencia.titulo}</h2>

        <div className="document-rule" />

        <p className="document-text">{evidencia.descricao}</p>

        <div className="document-clue">
          <div className="clue-heading">
            <FileSearch size={17} />
            <span>REGISTRO ENCONTRADO</span>
          </div>

          <p>{evidencia.pista}</p>
        </div>

        <div className="document-bottom">
          <span>
            <Clock3 size={13} />
            {evidencia.referencia}
          </span>
          <span>
            <Paperclip size={13} />
            DOCUMENTO {evidencia.numero}
          </span>
        </div>
      </article>

      <div className="panel-instruction">
        <span className="instruction-dot" />
        <p>Analise o documento. Cada detalhe pode ser importante.</p>
      </div>
    </section>
  );
}

export default PainelCaso;
