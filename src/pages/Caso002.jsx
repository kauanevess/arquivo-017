
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Folder,
  FileText,
  Lock,
  ArrowLeft,
  Search,
  HardDrive,
  Check,
  ChevronRight,
  KeyRound,
  Heart,
} from "lucide-react";
import "./Caso001.css";

const desafios = [
  {
    numero: "001",
    titulo: "Uma chegada inesquecível",
    tipo: "REGISTRO DE VISITA",
    descricao:
      "Depois de tanta espera, finalmente chegou o dia de ter você aqui em casa. Eu lembro da sua chegada e lembro também da minha reação quando te vi.",
    pista:
      "Eu estava tão animado que não consegui ficar parado. Em qual lugar da casa eu estava quando você chegou?",
    mecanismo: "text",
    pergunta: "Onde eu estava quando você chegou?",
    resposta: "nas escadas",
    dica: "Digite o lugar.",
    confirmacao:
      "Nas escadas! Eu estava tão feliz que parecia que não sabia nem como agir.",
  },
  {
    numero: "002",
    titulo: "Uma parada para adoçar",
    tipo: "REGISTRO DE PASSEIO",
    descricao:
      "Logo no começo da visita, saímos para buscar meus irmãos. Mas o passeio não terminou por ali. Depois, tivemos uma parada para aproveitar alguma coisa juntos.",
    pista:
      "Era uma sobremesa gelada. Uma daquelas coisas simples que acabam virando lembrança.",
    mecanismo: "choice",
    pergunta: "O que fomos tomar depois de buscar meus irmãos?",
    opcoes: ["Açaí", "Sorvete", "Milk-shake", "Refrigerante"],
    resposta: "Sorvete",
    confirmacao:
      "Sorvete! Foi um dos primeiros passeios daqueles cinco dias.",
  },
  {
    numero: "003",
    titulo: "As noites daqueles dias",
    tipo: "REGISTRO NOTURNO",
    descricao:
      "Foram cinco dias de visita, mas a gente não ficou só dentro de casa. Também saímos para aproveitar a noite, conhecer lugares e passar um tempo juntos.",
    pista:
      "Não foi apenas um lugar. Durante aqueles dias, visitamos vários estabelecimentos onde as pessoas costumam sair à noite.",
    mecanismo: "text",
    pergunta: "Que lugares visitamos durante os dias?",
    resposta: "bares",
    dica: "Digite sua resposta.",
    confirmacao:
      "Vários bares! Foram dias cheios de passeios e momentos que ficaram guardados.",
  },
  {
    numero: "004",
    titulo: "O segundo dia",
    tipo: "REGISTRO ESPECIAL",
    descricao:
      "Entre os cinco dias que você passou aqui, teve um momento que marcou nossa história de um jeito diferente. Não foi logo na chegada, mas também não demorou muito para acontecer.",
    pista:
      "Foi no dia seguinte ao dia em que você chegou.",
    mecanismo: "choice",
    pergunta: "Em qual dia aconteceu nosso primeiro beijo?",
    opcoes: ["Primeiro dia", "Segundo dia", "Terceiro dia", "Quinto dia"],
    resposta: "Segundo dia",
    confirmacao:
      "Segundo dia! Uma lembrança que eu não trocaria por nada.",
  },
  {
    numero: "005",
    titulo: "Uma festa em Sebollas",
    tipo: "REGISTRO DE EVENTO",
    descricao:
      "No meio daqueles cinco dias, também teve espaço para sair e curtir um evento. Um passeio que levou a gente até Sebollas.",
    pista:
      "O nome da festa faz referência a uma data comemorativa brasileira, lembrada no mês de abril.",
    mecanismo: "text",
    pergunta: "Qual era o nome da festa em Sebollas?",
    resposta: "tiradentes",
    dica: "Digite o nome da festa.",
    confirmacao:
      "Festa de Tiradentes! Mais um pedaço daqueles dias recuperado.",
  },
  {
    numero: "006",
    titulo: "O pastel que não foi esquecido",
    tipo: "REGISTRO FINAL",
    descricao:
      "Essa história começou com um esquecimento meu. Eu tinha esquecido de comprar seu pastel e saí correndo para resolver. Na pressa, esqueci de comprar o meu também. Mesmo decidido a ficar sem comer, alguém resolveu essa situação enquanto eu tomava banho.",
    pista:
      "Eu não precisei sair do banho para descobrir quem tinha ido comprar meu pastel.",
    mecanismo: "text",
    pergunta: "Quem foi comprar meu pastel enquanto eu tomava banho?",
    resposta: "giovanna",
    dica: "Digite o nome de quem foi.",
    confirmacao:
      "Você! Até meu pastel você foi buscar. E é por essas e outras que eu guardo cada detalhe desses dias.",
  },
];

function normalizar(valor) {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function Caso002() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(0);
  const [resposta, setResposta] = useState("");
  const [feedback, setFeedback] = useState("");
  const [concluido, setConcluido] = useState(false);
  const [mostrarVideo, setMostrarVideo] = useState(false);
  const [videoFinalizado, setVideoFinalizado] = useState(false);
  const [videoErro, setVideoErro] = useState(false);

  const desafio = desafios[etapa];
  const progresso = concluido ? 100 : (etapa / desafios.length) * 100;

  function verificarResposta(valor = resposta) {
    if (!valor.trim()) {
      setFeedback("Encontre uma resposta antes de continuar.");
      return;
    }

    if (normalizar(valor) === normalizar(desafio.resposta)) {
      setFeedback("correto");
    } else {
      setFeedback("Ainda não é essa a resposta. Tente novamente.");
    }
  }

  function continuar() {
    if (etapa === desafios.length - 1) {
      setMostrarVideo(true);
      setVideoErro(false);
      return;
    }

    setEtapa((atual) => atual + 1);
    setResposta("");
    setFeedback("");
  }

  function voltarEtapa() {
    if (etapa > 0) {
      setEtapa((atual) => atual - 1);
      setResposta("");
      setFeedback("");
    } else {
      navigate("/");
    }
  }

  function recuperarCarta() {
    let salvas = [];

    try {
      salvas = JSON.parse(
        localStorage.getItem("arquivo017-cartas") || "[]"
      );
    } catch {
      salvas = [];
    }

    if (!salvas.includes("002")) {
      localStorage.setItem(
        "arquivo017-cartas",
        JSON.stringify([...salvas, "002"])
      );
    }

    setMostrarVideo(false);
    setConcluido(true);
  }

  return (
    <main className="case-desktop">
      <header className="case-topbar">
        <span className="topbar-logo">017</span>
        <span>ARQUIVO PESSOAL</span>
        <span>CASO 002</span>
      </header>

      <section className="investigation-window">
        <header className="investigation-titlebar">
          <div className="investigation-brand">
            <span className="mini-logo">017</span>
            <span>Arquivo 017 — Investigação</span>
          </div>

          <button
            className="titlebar-close"
            onClick={() => navigate("/")}
            aria-label="Voltar à área de trabalho"
          >
            ×
          </button>
        </header>

        <nav className="investigation-menu">
          <button onClick={voltarEtapa}>
            <ArrowLeft size={13} />
            Voltar
          </button>
          <span>Arquivo</span>
          <span>Investigação</span>
          <span>Ajuda</span>
        </nav>

        <div className="investigation-address">
          <div>
            <HardDrive size={15} />
            <span>MEU COMPUTADOR / CASOS / CASO_002</span>
          </div>
          <span>6 REGISTROS</span>
        </div>

        {concluido ? (
          <div className="case-complete">
            <div className="complete-icon">
              <Heart size={29} />
            </div>

            <span className="complete-overline">ARQUIVO RECUPERADO</span>
            <h1>Os cinco dias juntos</h1>
            <p>
              Cinco dias, tantos passeios e pequenas lembranças que
              continuam sendo especiais. Agora essa parte da nossa
              história também está guardada aqui.
            </p>

            <div className="collectible-card">
              <div className="collectible-heading">
                <span>CARTA 002</span>
                <span>ARQUIVO 017</span>
              </div>

              <img
                src="/cartas/carta-002.png"
                alt="Fotografia da segunda carta de memória"
                className="collectible-photo"
              />

              <div className="collectible-caption">
                <span>OS CINCO DIAS JUNTOS</span>
                <small>Uma lembrança nossa para guardar.</small>
              </div>
            </div>

            <div className="complete-message">
              <Check size={16} />
              CARTA ADICIONADA ÀS MEMÓRIAS
            </div>

            <button
              className="case-main-button"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={15} />
              VOLTAR À ÁREA DE TRABALHO
            </button>
          </div>
        ) : (
          <>
            <div className="case-progress-area">
              <div className="progress-labels">
                <span>PROGRESSO DA INVESTIGAÇÃO</span>
                <span>{etapa} / 6 CONCLUÍDOS</span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progresso}%` }}
                />
              </div>
            </div>

            <div className="investigation-body">
              <aside className="evidence-sidebar">
                <div className="sidebar-heading">
                  <Folder size={14} />
                  CONTEÚDO DA PASTA
                </div>

                {desafios.map((item, index) => (
                  <div
                    key={item.numero}
                    className={`evidence-item ${
                      index === etapa ? "selected" : ""
                    } ${index < etapa ? "solved" : ""}`}
                  >
                    {index < etapa ? (
                      <Check size={15} />
                    ) : index === etapa ? (
                      <FileText size={15} />
                    ) : (
                      <Lock size={15} />
                    )}

                    <span>{item.titulo}</span>
                  </div>
                ))}

                <div className="sidebar-bottom">
                  <HardDrive size={14} />
                  <span>Arquivo pessoal</span>
                </div>
              </aside>

              <section className="evidence-viewer">
                <div className="viewer-toolbar">
                  <div>
                    <FileText size={14} />
                    REGISTRO_{desafio.numero}
                  </div>
                  <span>DOCUMENTO {etapa + 1} DE 6</span>
                </div>

                <div className="evidence-content">
                  <div className="evidence-meta">
                    <span>ARQUIVO DE INVESTIGAÇÃO</span>
                    <span>Nº {desafio.numero}</span>
                  </div>

                  <h1>{desafio.titulo}</h1>
                  <div className="evidence-type">{desafio.tipo}</div>

                  <div className="evidence-divider" />

                  <p className="evidence-description">
                    {desafio.descricao}
                  </p>

                  <div className="clue-panel">
                    <div className="clue-panel-title">
                      <Search size={14} />
                      PISTA ENCONTRADA
                    </div>
                    <p>{desafio.pista}</p>
                  </div>

                  <div className="puzzle-panel">
                    <div className="puzzle-heading">
                      <KeyRound size={15} />
                      <span>RESOLVA A EVIDÊNCIA</span>
                    </div>

                    <h2>{desafio.pergunta}</h2>

                    {desafio.mecanismo === "choice" ? (
                      <div className="answer-options">
                        {desafio.opcoes.map((opcao) => (
                          <button
                            key={opcao}
                            className={`answer-option ${
                              resposta === opcao ? "chosen" : ""
                            }`}
                            onClick={() => {
                              setResposta(opcao);
                              setFeedback("");
                            }}
                          >
                            <span className="option-radio">
                              {resposta === opcao && <span />}
                            </span>
                            {opcao}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="answer-input-area">
                        <input
                          value={resposta}
                          onChange={(event) => {
                            setResposta(event.target.value);
                            setFeedback("");
                          }}
                          onKeyDown={(event) => {
                            if (
                              event.key === "Enter" &&
                              feedback !== "correto"
                            ) {
                              verificarResposta();
                            }
                          }}
                          placeholder={desafio.dica}
                        />

                        <button
                          className="verify-button"
                          onClick={() => verificarResposta()}
                        >
                          VERIFICAR
                        </button>
                      </div>
                    )}

                    {feedback === "correto" ? (
                      <div className="answer-feedback success">
                        <Check size={16} />
                        <div>
                          <strong>EVIDÊNCIA CONFIRMADA</strong>
                          <p>{desafio.confirmacao}</p>
                        </div>
                      </div>
                    ) : feedback ? (
                      <div className="answer-feedback error">
                        {feedback}
                      </div>
                    ) : null}

                    {feedback === "correto" && (
                      <button
                        className="continue-button"
                        onClick={continuar}
                      >
                        {etapa === 5
                          ? "ASSISTIR À LEMBRANÇA"
                          : "PRÓXIMA EVIDÊNCIA"}
                        <ChevronRight size={16} />
                      </button>
                    )}

                    {feedback !== "correto" &&
                      desafio.mecanismo === "choice" && (
                        <button
                          className="verify-button choice-verify"
                          onClick={() => verificarResposta()}
                        >
                          CONFIRMAR RESPOSTA
                        </button>
                      )}
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {mostrarVideo && !concluido && (
          <div className="memory-player-overlay">
            <div className="media-player-window memory-player-modal">
              <div className="media-player-titlebar">
                <div className="media-player-title">
                  <span className="media-player-icon">▶</span>
                  Windows Media Player
                </div>

                <button
                  className="media-player-close"
                  onClick={() => setMostrarVideo(false)}
                  aria-label="Fechar player"
                >
                  ×
                </button>
              </div>

              <div className="media-player-menu">
                <span>Arquivo</span>
                <span>Exibir</span>
                <span>Reproduzir</span>
                <span>Ajuda</span>
              </div>

              <div className="media-player-content">
                {videoErro ? (
                  <div className="video-error">
                    <strong>Não foi possível abrir este arquivo.</strong>
                    <p>Confira se o vídeo está em public/videos.</p>
                    <p>O nome esperado é primeira-visita.mp4.</p>
                    <p>Endereço esperado: /videos/primeira-visita.mp4</p>
                  </div>
                ) : (
                  <video
                    className="memory-video"
                    src="/videos/primeira-visita.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    onError={() => setVideoErro(true)}
                    onEnded={() => setVideoFinalizado(true)}
                  />
                )}

                <div className="media-player-caption">
                  <span>A PRIMEIRA VISITA</span>
                  <span>
                    {videoFinalizado
                      ? "REPRODUÇÃO CONCLUÍDA"
                      : videoErro
                        ? "ERRO AO ABRIR ARQUIVO"
                        : "ARQUIVO DE VÍDEO"}
                  </span>
                </div>
              </div>

              {videoFinalizado ? (
                <div className="video-finished-area">
                  <div className="video-finished-message">
                    <Check size={16} />
                    <span>
                      A lembrança foi reproduzida. A carta está pronta
                      para ser recuperada.
                    </span>
                  </div>

                  <button
                    className="case-main-button"
                    onClick={recuperarCarta}
                  >
                    RECUPERAR CARTA 002
                    <ChevronRight size={16} />
                  </button>
                </div>
              ) : (
                <p className="video-instruction">
                  Assista até o final para recuperar a lembrança.
                </p>
              )}
            </div>
          </div>
        )}

        <footer className="investigation-status">
          <span>PRONTO</span>
          <span>CASO 002 — OS CINCO DIAS</span>
          <span>
            {concluido
              ? "MEMÓRIA RECUPERADA"
              : mostrarVideo
                ? "LEMBRANÇA ABERTA"
                : "ARQUIVO ABERTO"}
          </span>
        </footer>
      </section>

      <footer className="case-taskbar">
        <button onClick={() => navigate("/")}>
          <span className="taskbar-mark">017</span>
          Iniciar
        </button>

        <div className="taskbar-active">
          <FileText size={13} />
          Investigação: Caso 002
        </div>

        <div className="taskbar-time">17:00</div>
      </footer>
    </main>
  );
}

export default Caso002;
