import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Folder,
  FileText,
  Lock,
  ArrowLeft,
  Check,
  ChevronRight,
  Heart,
  Search,
  KeyRound,
  HardDrive,
} from "lucide-react";
import "./Caso001.css";

const desafios = [
  {
    numero: "001",
    titulo: "Uma data especial",
    tipo: "REGISTRO DE DATA",
    descricao:
      "Um dia que marcou nossa história e que teve um significado especial para nós dois.",
    pista: "Foi no mês de junho, no dia dedicado aos namorados.",
    pergunta: "Em que dia comemoramos nosso primeiro Dia dos Namorados juntos?",
    mecanismo: "choice",
    opcoes: ["12/05", "12/06", "15/06", "24/04"],
    resposta: "12/06",
    confirmacao:
      "12 de junho! Nosso primeiro Dia dos Namorados juntos, com mais uma lembrança para guardar.",
  },
  {
    numero: "002",
    titulo: "Um presente cheiroso",
    tipo: "REGISTRO DE PRESENTE",
    descricao:
      "Naquele dia, escolhi um presente para você. Queria que tivesse algo que pudesse lembrar daquele momento.",
    pista: "Era um perfume da linha Liz, de uma marca brasileira bem conhecida.",
    pergunta: "Qual foi o perfume que escolhi para você naquele dia?",
    mecanismo: "text",
    respostas: ["liz", "liz do boticario", "liz o boticario"],
    dica: "Digite o nome do perfume.",
    confirmacao:
      "Liz, do Boticário! Esse foi um dos presentes daquele Dia dos Namorados.",
  },
  {
    numero: "003",
    titulo: "Um buquê especial",
    tipo: "REGISTRO DE FLORES",
    descricao:
      "Além do perfume, também preparei um buquê de flores do campo. Mas pedi para acrescentarem uma flor em especial.",
    pista: "É uma flor conhecida por acompanhar o movimento do sol.",
    pergunta: "Que flor pedi para acrescentar ao buquê de flores do campo?",
    mecanismo: "choice",
    opcoes: [
      "Uma rosa vermelha",
      "Um lírio",
      "Um girassol",
      "Uma margarida",
    ],
    resposta: "Um girassol",
    confirmacao:
      "Um girassol! Fiz questão de pedir para acrescentarem um no buquê.",
  },
  {
    numero: "004",
    titulo: "Nosso jantar",
    tipo: "REGISTRO DE PASSEIO",
    descricao:
      "Depois dos presentes, saímos para comer e aproveitar aquele dia juntos.",
    pista: "O nome do lugar tem duas letras no começo e termina com a palavra Beach.",
    pergunta: "Em qual lugar saímos para jantar no Dia dos Namorados?",
    mecanismo: "text",
    respostas: ["tr beach", "trbeach"],
    dica: "Digite o nome do lugar.",
    confirmacao:
      "TR Beach! Foi lá que saímos para comer naquele Dia dos Namorados.",
  },
  {
    numero: "005",
    titulo: "Uma comemoração",
    tipo: "REGISTRO DE ANIVERSÁRIO",
    descricao:
      "Depois do nosso jantar, ainda tivemos outra comemoração para participar naquela noite.",
    pista: "Era o aniversário de alguém que faz parte da nossa história.",
    pergunta: "Ao aniversário de quem fomos nesse final de semana?",
    mecanismo: "text",
    respostas: ["helena", "aniversario da helena"],
    dica: "Digite o nome da pessoa.",
    confirmacao:
      "Helena! Depois do nosso jantar, fomos comemorar o aniversário dela.",
  },
  {
    numero: "006",
    titulo: "Uma derrota memorável",
    tipo: "REGISTRO DE JOGO",
    descricao:
      "O dia ainda teve uma disputa entre nós dois. E, dessa vez, quem acabou perdendo fui eu.",
    pista: "Era um jogo em que a gente precisava acompanhar a música e acertar os movimentos.",
    pergunta: "Em qual jogo eu acabei perdendo para você?",
    mecanismo: "choice",
    opcoes: ["Mario Kart", "Just Dance", "FIFA", "Uno"],
    resposta: "Just Dance",
    confirmacao:
      "Just Dance! E eu ainda tive que aceitar a derrota para você.",
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

export default function Caso005() {
  const navigate = useNavigate();

  const [etapa, setEtapa] = useState(0);
  const [resposta, setResposta] = useState("");
  const [feedback, setFeedback] = useState("");
  const [mostrarVideo, setMostrarVideo] = useState(false);
  const [videoFinalizado, setVideoFinalizado] = useState(false);
  const [videoErro, setVideoErro] = useState(false);
  const [concluido, setConcluido] = useState(false);

  const desafio = desafios[etapa];
  const progresso = concluido ? 100 : (etapa / desafios.length) * 100;

  function verificarResposta(valor = resposta) {
    if (!valor.trim()) {
      setFeedback("Encontre uma resposta antes de continuar.");
      return;
    }

    const correta =
      desafio.mecanismo === "choice"
        ? normalizar(valor) === normalizar(desafio.resposta)
        : desafio.respostas.some(
            (item) => normalizar(item) === normalizar(valor)
          );

    if (correta) {
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

    if (!salvas.includes("005")) {
      localStorage.setItem(
        "arquivo017-cartas",
        JSON.stringify([...salvas, "005"])
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
        <span>CASO 005</span>
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
            <span>MEU COMPUTADOR / CASOS / CASO_005</span>
          </div>
          <span>6 REGISTROS</span>
        </div>

        {concluido ? (
          <div className="case-complete">
            <div className="complete-icon">
              <Heart size={29} />
            </div>

            <span className="complete-overline">ARQUIVO RECUPERADO</span>
            <h1>Um dia para guardar</h1>
            <p>
              Um dia cheio de presentes, flores, passeios e momentos que
              merecem continuar guardados.
            </p>

            <div className="collectible-card">
              <div className="collectible-heading">
                <span>CARTA 005</span>
                <span>ARQUIVO 017</span>
              </div>

              <img
                src="/cartas/carta-005.png"
                alt="Carta 005"
                className="collectible-photo"
              />

              <div className="collectible-caption">
                <span>UM DIA PARA GUARDAR</span>
                <small>12 de junho de 2026</small>
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

                  <div className="evidence-description">
                    {desafio.descricao}
                  </div>

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
                          ? "ASSISTIR AO DIA DOS NAMORADOS"
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
                    <p>O nome esperado é dia-dos-namorados.mp4.</p>
                    <p>Endereço esperado: /videos/dia-dos-namorados.mp4</p>
                  </div>
                ) : (
                  <video
                    className="memory-video"
                    src="/videos/dia-dos-namorados.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    onError={() => setVideoErro(true)}
                    onEnded={() => setVideoFinalizado(true)}
                  />
                )}

                <div className="media-player-caption">
                  <span>UM DIA PARA GUARDAR</span>
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
                      O registro foi concluído. A Carta 005 está pronta
                      para ser recuperada.
                    </span>
                  </div>

                  <button
                    className="case-main-button"
                    onClick={recuperarCarta}
                  >
                    RECUPERAR CARTA 005
                    <ChevronRight size={16} />
                  </button>
                </div>
              ) : (
                <p className="video-instruction">
                  Assista até o final para recuperar essa lembrança.
                </p>
              )}
            </div>
          </div>
        )}

        <footer className="investigation-status">
          <span>PRONTO</span>
          <span>CASO 005 — UM DIA PARA GUARDAR</span>
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
          Investigação: Caso 005
        </div>

        <div className="taskbar-time">17:00</div>
      </footer>
    </main>
  );
}