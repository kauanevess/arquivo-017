
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
    titulo: "A primeira partida",
    tipo: "REGISTRO DE PARTIDA",
    descricao:
      "Duas pessoas entraram na mesma partida. Naquela época, ninguém imaginava que um simples jogo acabaria dando início a tanta coisa.",
    pista:
      "O primeiro registro aponta para um jogo competitivo. Em qual jogo nossos caminhos se cruzaram?",
    mecanismo: "choice",
    pergunta: "Onde essa história começou?",
    opcoes: ["League of Legends", "Valorant", "Minecraft", "Fortnite"],
    resposta: "Valorant",
    confirmacao:
      "Foi ali que tudo começou. E ainda existe uma promessa daquela época...",
  },
  {
    numero: "002",
    titulo: "Uma promessa pendente",
    tipo: "REGISTRO DE COMPROMISSO",
    descricao:
      "Uma aposta foi feita durante nossas partidas. O combinado envolvia uma recompensa muito específica, que até hoje continua pendente.",
    pista:
      "A recompensa é uma pequena yordle, suporte e muito querida por quem joga League of Legends.",
    mecanismo: "text",
    pergunta: "Qual é a personagem dessa promessa?",
    resposta: "lulu",
    dica: "Escreva o nome da personagem.",
    confirmacao:
      "Lulu! A promessa continua de pé. Ainda não esqueci essas skins.",
  },
  {
    numero: "003",
    titulo: "A primeira chamada",
    tipo: "REGISTRO DE COMUNICAÇÃO",
    descricao:
      "Chegou o dia da primeira chamada de vídeo. Uma lembrança simples, mas que ficou guardada: enquanto conversávamos, alguém estava preparando alguma coisa na cozinha.",
    pista:
      "Era uma comida brasileira, com massa e recheio, que estava sendo preparada naquele momento.",
    mecanismo: "choice",
    pergunta: "O que ela estava fazendo naquele dia?",
    opcoes: ["Bolo", "Pastel", "Pizza", "Pão de queijo"],
    resposta: "Pastel",
    confirmacao:
      "Era pastel! Nossa primeira chamada de vídeo ficou registrada.",
  },
  {
    numero: "004",
    titulo: "Todo final de semana",
    tipo: "REGISTRO DE ROTINA",
    descricao:
      "Com o tempo, os finais de semana ganharam uma rotina própria. Tinha filme, conversa, partidas e uma companhia que já fazia falta quando não estava por perto.",
    pista:
      "Além de assistir filmes juntos, existia um jogo de estratégia que vocês jogavam em equipe, montando composições e escolhendo campeões.",
    mecanismo: "choice",
    pergunta: "Qual era esse jogo?",
    opcoes: ["Dota 2", "Teamfight Tactics", "Overwatch", "Rocket League"],
    resposta: "Teamfight Tactics",
    confirmacao:
      "TFT! Nossos finais de semana tinham uma combinação especial de filmes e partidas.",
  },
  {
    numero: "005",
    titulo: "A história do filme",
    tipo: "REGISTRO AUDIOVISUAL",
    descricao:
      "Entre tantos filmes assistidos juntos, um deles merece um espaço especial neste arquivo.",
    pista:
      "Uma história musical na praia, com surfistas, motociclistas e muita música. O título tem três palavras.",
    mecanismo: "text",
    pergunta: "Qual é o nome do filme?",
    resposta: "teen beach movie",
    dica: "Digite o nome do filme.",
    confirmacao:
      "Teen Beach Movie! Mais uma lembrança encontrada.",
  },
  {
    numero: "006",
    titulo: "A última evidência",
    tipo: "DOCUMENTO FINAL",
    descricao:
      "Todos os registros anteriores apontam para uma última lembrança. Uma música que também faz parte da história de vocês.",
    pista:
      "O título fala sobre algo que estava destinado a acontecer. É uma música chamada...",
    mecanismo: "text",
    pergunta: "Qual é o nome da música?",
    resposta: "meant to be",
    dica: "Digite o título da música.",
    confirmacao:
      "Meant to Be. Algumas histórias realmente parecem ter encontrado seu caminho.",
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

function Caso001() {
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

    if (!salvas.includes("001")) {
      localStorage.setItem(
        "arquivo017-cartas",
        JSON.stringify([...salvas, "001"])
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
        <span>CASO 001</span>
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
            <span>MEU COMPUTADOR / CASOS / CASO_001</span>
          </div>
          <span>6 REGISTROS</span>
        </div>

        {concluido ? (
          <div className="case-complete">
            <div className="complete-icon">
              <Heart size={29} />
            </div>

            <span className="complete-overline">ARQUIVO RECUPERADO</span>
            <h1>Onde tudo começou</h1>
            <p>
              Todas as evidências foram reunidas. Uma lembrança
              foi recuperada e agora pertence à sua coleção.
            </p>

            <div className="collectible-card">
              <div className="collectible-heading">
                <span>CARTA 001</span>
                <span>ARQUIVO 017</span>
              </div>

              <img
                src="/cartas/carta-001.png"
                alt="Fotografia da primeira carta de memória"
                className="collectible-photo"
              />

              <div className="collectible-caption">
                <span>ONDE TUDO COMEÇOU</span>
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
                    <p>O nome esperado é meant-to-be.mp4.</p>
                    <p>Endereço esperado: /videos/meant-to-be.mp4</p>
                  </div>
                ) : (
                  <video
                    className="memory-video"
                    src="/videos/meant-to-be.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    onError={() => setVideoErro(true)}
                    onEnded={() => setVideoFinalizado(true)}
                  />
                )}

                <div className="media-player-caption">
                  <span>MEANT TO BE</span>
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
                    RECUPERAR CARTA 001
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
          <span>CASO 001 — O INÍCIO DE TUDO</span>
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
          Investigação: Caso 001
        </div>

        <div className="taskbar-time">17:00</div>
      </footer>
    </main>
  );
}

export default Caso001;
