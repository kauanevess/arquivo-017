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
    titulo: "Uma cidade nova",
    tipo: "REGISTRO DE VIAGEM",
    descricao: "Um destino que se tornou parte da nossa história.",
    pergunta: "Qual foi a cidade onde passamos esses cinco dias juntos?",
    mecanismo: "text",
    resposta: "sao joao del rei",
    dica: "Digite o nome da cidade.",
    pista: "Fica em Minas Gerais e foi a primeira vez que visitei essa cidade.",
    confirmacao:
      "São João del-Rei. Foi lá que passamos cinco dias juntos e começamos a guardar mais uma coleção de lembranças.",
  },
  {
    numero: "002",
    titulo: "Uma conquista dela",
    tipo: "REGISTRO ACADÊMICO",
    descricao: "Um momento importante que tive a oportunidade de acompanhar.",
    pergunta: "Qual apresentação sua eu fui assistir durante a viagem?",
    mecanismo: "choice",
    opcoes: [
      "Apresentação de estágio",
      "Apresentação de TCC",
      "Uma palestra da faculdade",
      "Uma apresentação de seminário",
    ],
    resposta: "Apresentação de TCC",
    pista: "Era uma etapa muito importante da sua vida acadêmica.",
    confirmacao:
      "A apresentação do TCC. Eu pude estar ali acompanhando uma conquista importante sua.",
  },
  {
    numero: "003",
    titulo: "Pessoas importantes",
    tipo: "REGISTRO DE ENCONTRO",
    descricao: "Conhecer um pouco mais da vida que existia antes de mim.",
    pergunta: "Quem eu conheci durante aqueles dias em Divinópolis?",
    mecanismo: "choice",
    opcoes: [
      "Seus colegas de trabalho",
      "Seus vizinhos",
      "Seus amigos",
      "Seus professores",
    ],
    resposta: "Seus amigos",
    pista:
      "Eram pessoas que faziam parte da sua vida e que eu ainda não conhecia.",
    confirmacao:
      "Seus amigos. Eu estava conhecendo pessoas que já tinham um lugar importante na sua história.",
  },
  {
    numero: "004",
    titulo: "Mais um destino",
    tipo: "REGISTRO DE DESLOCAMENTO",
    descricao: "A viagem ainda tinha mais uma parada.",
    pergunta: "Para qual cidade fomos conhecer seus pais?",
    mecanismo: "text",
    resposta: "sapucai mirim",
    dica: "Digite o nome da cidade.",
    pista: "Uma cidade mineira cujo nome também aparece no nosso roteiro.",
    confirmacao:
      "Sapucaí-Mirim. Foi lá que conheci seus pais pela primeira vez.",
  },
  {
    numero: "005",
    titulo: "O peso daquele encontro",
    tipo: "REGISTRO PESSOAL",
    descricao: "Nem todo momento importante vem acompanhado de tranquilidade.",
    pergunta: "Como eu estava me sentindo ao conhecer seus amigos e seus pais?",
    mecanismo: "choice",
    opcoes: [
      "Com sono",
      "Muito nervoso",
      "Com pressa para ir embora",
      "Com vergonha de conversar",
    ],
    resposta: "Muito nervoso",
    pista:
      "Não era um encontro qualquer. Eu sabia o quanto aquelas pessoas significavam para você.",
    confirmacao:
      "Muito nervoso. Eram pessoas muito importantes para você, e eu queria que tudo desse certo.",
  },
  {
    numero: "006",
    titulo: "Cinco dias",
    tipo: "REGISTRO FINAL",
    descricao: "O que ficou depois de conhecer tantos pedaços da sua vida?",
    pergunta: "Quantos dias passamos juntos nessa viagem?",
    mecanismo: "choice",
    opcoes: ["Três dias", "Quatro dias", "Cinco dias", "Duas semanas"],
    resposta: "Cinco dias",
    pista: "O próprio nome deste arquivo guarda a resposta.",
    confirmacao:
      "Cinco dias. Cinco dias conhecendo lugares, pessoas e momentos que fazem parte de você. E eu fiquei feliz por poder estar ali.",
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

export default function Caso004() {
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

    if (!salvas.includes("004")) {
      localStorage.setItem(
        "arquivo017-cartas",
        JSON.stringify([...salvas, "004"])
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
        <span>CASO 004</span>
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
            <span>MEU COMPUTADOR / CASOS / CASO_004</span>
          </div>
          <span>6 REGISTROS</span>
        </div>

        {concluido ? (
          <div className="case-complete">
            <div className="complete-icon">
              <Heart size={29} />
            </div>

            <span className="complete-overline">ARQUIVO RECUPERADO</span>
            <h1>CINCO DIAS QUE FICARAM</h1>
            <p>
              Existem lugares que ficam especiais não pelo lugar em si,
              mas pelas pessoas e pelos momentos que vivemos neles.
            </p>

            <div className="collectible-card">
              <div className="collectible-heading">
                <span>CARTA 004</span>
                <span>ARQUIVO 017</span>
              </div>

              <img
                src="/cartas/carta-004.png"
                alt="Carta 004"
                className="collectible-photo"
              />

              <div className="collectible-caption">
                <span>CINCO DIAS QUE FICARAM</span>
                <small>ARQUIVO PESSOAL</small>
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
                    <p>O nome esperado é cinco-dias.mp4.</p>
                    <p>Endereço esperado: /videos/cinco-dias.mp4</p>
                  </div>
                ) : (
                  <video
                    className="memory-video"
                    src="/videos/cinco-dias.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    onError={() => setVideoErro(true)}
                    onEnded={() => setVideoFinalizado(true)}
                  />
                )}

                <div className="media-player-caption">
                  <span>CINCO DIAS QUE FICARAM</span>
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
                      Todos os registros foram recuperados. A Carta 004 está
                      pronta para ser adicionada às memórias.
                    </span>
                  </div>

                  <button
                    className="case-main-button"
                    onClick={recuperarCarta}
                  >
                    RECUPERAR CARTA 004
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
          <span>CASO 004 — CINCO DIAS QUE FICARAM</span>
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
          Investigação: Caso 004
        </div>

        <div className="taskbar-time">17:00</div>
      </footer>
    </main>
  );
}