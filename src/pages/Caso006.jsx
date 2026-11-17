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
    titulo: "A primeira mudança",
    tipo: "REGISTRO DE JULHO",
    descricao:
      "Julho começou com uma mudança importante. Foi um mês em que conseguimos ficar juntos e compartilhar vários momentos.",
    pista: "Antes de aproveitar o mês juntos, tivemos uma primeira missão.",
    pergunta:
      "Qual foi a primeira coisa que fizemos quando começou aquele mês juntos?",
    mecanismo: "choice",
    opcoes: [
      "Fomos à praia",
      "Ajudei você a se mudar para a casa dos seus pais",
      "Fomos à festa julina",
      "Comemoramos sua formatura",
    ],
    resposta: "Ajudei você a se mudar para a casa dos seus pais",
    confirmacao:
      "Ajudei você a se mudar para a casa dos seus pais. Foi assim que começou aquele mês que passamos juntos.",
  },
  {
    numero: "002",
    titulo: "Um mês inteiro",
    tipo: "REGISTRO DE CONVIVÊNCIA",
    descricao:
      "Depois da mudança, tivemos a oportunidade de passar um mês inteiro juntos, criando lembranças até nos dias mais comuns.",
    pista: "Foi o mês que veio logo depois de junho.",
    pergunta: "Durante qual mês conseguimos passar todo esse tempo juntos?",
    mecanismo: "choice",
    opcoes: ["Maio", "Junho", "Julho", "Agosto"],
    resposta: "Julho",
    confirmacao:
      "Julho! Um mês inteiro de convivência, passeios e momentos que ficaram guardados.",
  },
  {
    numero: "003",
    titulo: "A promessa",
    tipo: "REGISTRO DE UMA CONVERSA",
    descricao:
      "Existia uma promessa sobre conhecer a praia com alguém especial. E, naquele mês, tivemos a oportunidade de fazer isso acontecer.",
    pista:
      "Era uma promessa que envolvia uma viagem à praia e um compromisso para o futuro.",
    pergunta:
      "Segundo aquela promessa, o que aconteceria se você levasse alguém que amasse para conhecer a praia?",
    mecanismo: "choice",
    opcoes: [
      "Teria que viajar novamente",
      "Teria que casar com essa pessoa",
      "Teria que voltar no ano seguinte",
      "Teria que escrever uma carta",
    ],
    resposta: "Teria que casar com essa pessoa",
    confirmacao:
      "Teria que casar com essa pessoa. E olha só: acabamos cumprindo a promessa de conhecer a praia juntos.",
  },
  {
    numero: "004",
    titulo: "Promessa cumprida",
    tipo: "REGISTRO DE VIAGEM",
    descricao:
      "A promessa finalmente saiu do papel. Chegou o momento de conhecer a praia juntos e viver aquele dia.",
    pista: "Foi um lugar onde pudemos aproveitar o mar juntos.",
    pergunta: "Qual lugar finalmente visitamos juntos para cumprir a promessa?",
    mecanismo: "text",
    respostas: ["praia", "a praia"],
    dica: "Digite o lugar que visitamos.",
    confirmacao:
      "A praia! Finalmente conseguimos viver aquele momento juntos e cumprir a promessa.",
  },
  {
    numero: "005",
    titulo: "Uma festa no condomínio",
    tipo: "REGISTRO DE JULHO",
    descricao:
      "Além da praia, julho também teve uma comemoração no condomínio, com mais uma lembrança daquele mês.",
    pista: "Era uma festa típica do período de inverno, realizada em julho.",
    pergunta: "Qual festa aconteceu no condomínio durante aquele mês?",
    mecanismo: "choice",
    opcoes: [
      "Festa junina",
      "Festa julina",
      "Festa de Halloween",
      "Festa de Natal",
    ],
    resposta: "Festa julina",
    confirmacao:
      "Festa julina! Mais um momento que fez parte daquele mês que passamos juntos.",
  },
  {
    numero: "006",
    titulo: "Um dia de orgulho",
    tipo: "REGISTRO DE AGOSTO",
    descricao:
      "Julho terminou, mas nossa história continuou. Em agosto, chegou um dia muito importante na sua trajetória.",
    pista: "Foi uma conquista que marcou o fim de uma etapa da sua vida acadêmica.",
    pergunta: "Qual conquista sua comemoramos em agosto?",
    mecanismo: "choice",
    opcoes: [
      "Seu aniversário",
      "Sua aprovação no vestibular",
      "Sua formatura",
      "Seu primeiro emprego",
    ],
    resposta: "Sua formatura",
    confirmacao:
      "Sua formatura! Foi muito especial poder acompanhar mais essa conquista sua.",
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

export default function Caso006() {
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

    if (!salvas.includes("006")) {
      localStorage.setItem(
        "arquivo017-cartas",
        JSON.stringify([...salvas, "006"])
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
        <span>CASO 006</span>
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
            <span>MEU COMPUTADOR / CASOS / CASO_006</span>
          </div>
          <span>6 REGISTROS</span>
        </div>

        {concluido ? (
          <div className="case-complete">
            <div className="complete-icon">
              <Heart size={29} />
            </div>

            <span className="complete-overline">ARQUIVO RECUPERADO</span>
            <h1>A promessa que virou realidade</h1>
            <p>
              Foram dias de convivência, uma promessa cumprida e conquistas
              que tive a felicidade de acompanhar. Mais uma parte da nossa
              história que agora fica guardada.
            </p>

            <div className="collectible-card">
              <div className="collectible-heading">
                <span>CARTA 006</span>
                <span>ARQUIVO 017</span>
              </div>

              <img
                src="/cartas/carta-006.png"
                alt="Carta 006"
                className="collectible-photo"
              />

              <div className="collectible-caption">
                <span>A PROMESSA QUE VIROU REALIDADE</span>
                <small>ÚLTIMO REGISTRO</small>
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
                          <p>
                            {desafio.confirmacao}
                          </p>
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
                          ? "ASSISTIR AO REGISTRO"
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
                    <p>O nome esperado é caso-006.mp4.</p>
                    <p>Endereço esperado: /videos/caso-006.mp4</p>
                  </div>
                ) : (
                  <video
                    className="memory-video"
                    src="/videos/caso-006.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    onError={() => setVideoErro(true)}
                    onEnded={() => setVideoFinalizado(true)}
                  />
                )}

                <div className="media-player-caption">
                  <span>A PROMESSA QUE VIROU REALIDADE</span>
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
                      O último registro foi concluído. A Carta 006 está
                      pronta para ser recuperada.
                    </span>
                  </div>

                  <button
                    className="case-main-button"
                    onClick={recuperarCarta}
                  >
                    RECUPERAR CARTA 006
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
          <span>CASO 006 — A PROMESSA QUE VIROU REALIDADE</span>
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
          Investigação: Caso 006
        </div>

        <div className="taskbar-time">17:00</div>
      </footer>
    </main>
  );
}