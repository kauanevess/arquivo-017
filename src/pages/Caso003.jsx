
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
    titulo: "Uma data especial",
    tipo: "REGISTRO DE ANIVERSÁRIO",
    descricao:
      "Tudo começou com uma comemoração que já estava sendo planejada. Meu aniversário foi no dia 12 de maio, mas a festa seria alguns dias depois.",
    pista:
      "O primeiro registro dessa história é a data do meu aniversário.",
    mecanismo: "text",
    pergunta: "Em qual dia eu faço aniversário?",
    resposta: "12/05",
    dica: "Digite a data no formato DD/MM.",
    confirmacao:
      "12 de maio! A comemoração estava chegando, mas eu já tinha outra surpresa preparada.",
  },
  {
    numero: "002",
    titulo: "O dia da comemoração",
    tipo: "REGISTRO DE EVENTO",
    descricao:
      "A festa do meu aniversário não aconteceria exatamente no dia 12. A gente já tinha combinado de comemorar em outro dia, e também tinha um detalhe sobre nossas roupas.",
    pista:
      "Nós dois combinamos de ir vestidos de amarelo. Era o nosso famoso bananão.",
    mecanismo: "text",
    pergunta: "Em qual dia seria a festa?",
    resposta: "16/05",
    dica: "Digite a data no formato DD/MM.",
    confirmacao:
      "Dia 16! E ainda fomos combinando de amarelo para o nosso bananão.",
  },
  {
    numero: "003",
    titulo: "Um dia antes",
    tipo: "REGISTRO DE DECISÃO",
    descricao:
      "A festa ainda nem tinha acontecido, mas eu já sabia que não queria deixar aquela ocasião passar sem fazer uma coisa muito importante.",
    pista:
      "O pedido aconteceu um dia antes da comemoração do aniversário.",
    mecanismo: "text",
    pergunta: "Em qual dia eu te pedi em namoro?",
    resposta: "15/05",
    dica: "Digite a data no formato DD/MM.",
    confirmacao:
      "15 de maio. Foi nesse dia que eu decidi transformar nossa história em namoro.",
  },
  {
    numero: "004",
    titulo: "Flores para você",
    tipo: "REGISTRO DA SURPRESA",
    descricao:
      "Para preparar aquele momento, escolhi flores para entregar a você. Não queria que fosse um pedido qualquer. Cada detalhe tinha sido pensado com carinho.",
    pista:
      "Eram flores de uma cor que combinava com a delicadeza daquele momento.",
    mecanismo: "choice",
    pergunta: "Qual era a cor das rosas?",
    opcoes: ["Vermelhas", "Rosas", "Brancas", "Amarelas"],
    resposta: "Brancas",
    confirmacao:
      "Rosas brancas! Elas fizeram parte daquela surpresa que preparei para você.",
  },
  {
    numero: "005",
    titulo: "Tudo preparado",
    tipo: "REGISTRO DE AMBIENTE",
    descricao:
      "Além das flores, preparei uma decoração para deixar o momento ainda mais especial. Queria que, quando você abrisse os olhos, encontrasse uma surpresa esperando por você.",
    pista:
      "Não foi em um salão, restaurante ou lugar público. Preparei tudo em um espaço da minha casa.",
    mecanismo: "text",
    pergunta: "Qual lugar da casa eu decorei para fazer o pedido?",
    resposta: "quarto",
    dica: "Digite o lugar.",
    confirmacao:
      "Meu quarto! Tudo estava preparado para aquele momento.",
  },
  {
    numero: "006",
    titulo: "A resposta",
    tipo: "REGISTRO FINAL",
    descricao:
      "Chegou a hora da surpresa. Você estava com as mãos nos olhos, esperando para descobrir o que eu tinha preparado. Quando finalmente viu, sua reação foi impossível de esquecer.",
    pista:
      "Antes de chorar um pouquinho e aceitar meu pedido, você teve uma reação que eu nunca vou esquecer.",
    mecanismo: "choice",
    pergunta: "O que você fez quando viu a surpresa?",
    opcoes: [
      "Ficou em silêncio",
      "Deu um grito de felicidade",
      "Começou a rir",
      "Saiu correndo",
    ],
    resposta: "Deu um grito de felicidade",
    confirmacao:
      "Você deu um grito de felicidade, chorou um pouquinho e aceitou meu pedido. Foi assim que começou nosso namoro.",
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

function Caso003() {
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

    if (!salvas.includes("003")) {
      localStorage.setItem(
        "arquivo017-cartas",
        JSON.stringify([...salvas, "003"])
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
        <span>CASO 003</span>
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
            <span>MEU COMPUTADOR / CASOS / CASO_003</span>
          </div>
          <span>6 REGISTROS</span>
        </div>

        {concluido ? (
          <div className="case-complete">
            <div className="complete-icon">
              <Heart size={29} />
            </div>

            <span className="complete-overline">ARQUIVO RECUPERADO</span>
            <h1>O dia em que ela disse sim</h1>
            <p>
              No dia 15 de maio, entre rosas brancas, uma surpresa
              e um grito de felicidade, começou uma nova parte
              da nossa história.
            </p>

            <div className="collectible-card">
              <div className="collectible-heading">
                <span>CARTA 003</span>
                <span>ARQUIVO 017</span>
              </div>

              <img
                src="/cartas/carta-003.png"
                alt="Carta 003"
                className="collectible-photo"
              />

              <div className="collectible-caption">
                <span>O DIA EM QUE ELA DISSE SIM</span>
                <small>15 de maio de 2026</small>
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
                          ? "ASSISTIR AO PEDIDO"
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
                    <p>O nome esperado é pedido-namoro.mp4.</p>
                    <p>Endereço esperado: /videos/pedido-namoro.mp4</p>
                  </div>
                ) : (
                  <video
                    className="memory-video"
                    src="/videos/pedido-namoro.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    onError={() => setVideoErro(true)}
                    onEnded={() => setVideoFinalizado(true)}
                  />
                )}

                <div className="media-player-caption">
                  <span>O PEDIDO DE NAMORO</span>
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
                      O pedido foi registrado. A Carta 003 está pronta
                      para ser recuperada.
                    </span>
                  </div>

                  <button
                    className="case-main-button"
                    onClick={recuperarCarta}
                  >
                    RECUPERAR CARTA 003
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
          <span>CASO 003 — O PEDIDO DE NAMORO</span>
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
          Investigação: Caso 003
        </div>

        <div className="taskbar-time">17:00</div>
      </footer>
    </main>
  );
}

export default Caso003;
