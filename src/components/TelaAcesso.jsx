
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Folder,
  FileText,
  Image,
  Trash2,
  X,
  Minus,
  Square,
  Monitor,
  Power,
  Lock,
  Check,
  Heart,
  Star,
} from "lucide-react";
import SurpresaFinal from "./SurpresaFinal";
import "../App.css";

function TelaAcesso() {
  const navigate = useNavigate();

  const [hora, setHora] = useState(new Date());
  const [janela, setJanela] = useState(null);
  const [menuIniciar, setMenuIniciar] = useState(false);
  const [cartas, setCartas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("arquivo017-cartas") || "[]");
    } catch {
      return [];
    }
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const intervalo = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    function atualizarCartas() {
      try {
        setCartas(
          JSON.parse(localStorage.getItem("arquivo017-cartas") || "[]")
        );
      } catch {
        setCartas([]);
      }
    }

    window.addEventListener("focus", atualizarCartas);
    return () => window.removeEventListener("focus", atualizarCartas);
  }, []);

  function abrirJanela(nome) {
    setMenuIniciar(false);
    setMensagem("");
    setJanela(nome);

    try {
      setCartas(
        JSON.parse(localStorage.getItem("arquivo017-cartas") || "[]")
      );
    } catch {
      setCartas([]);
    }
  }

  function fecharJanela() {
    setJanela(null);
    setMensagem("");
  }

  const horario = hora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const data = hora.toLocaleDateString("pt-BR");

  const carta001Recuperada = cartas.includes("001");
  const carta002Recuperada = cartas.includes("002");
  const carta003Recuperada = cartas.includes("003");
  const carta004Recuperada = cartas.includes("004");
  const carta005Recuperada = cartas.includes("005");
  const carta006Recuperada = cartas.includes("006");

  const surpresaLiberada = carta006Recuperada;

  const casos = [
    {
      numero: "001",
      titulo: "O início de tudo",
      descricao: "6 registros · investigação pessoal",
      recuperada: carta001Recuperada,
      liberado: true,
      rota: "/caso-001",
    },
    {
      numero: "002",
      titulo: "Uma semana em casa",
      descricao: "6 registros · lembranças da nossa semana",
      recuperada: carta002Recuperada,
      liberado: carta001Recuperada,
      rota: "/caso-002",
    },
    {
      numero: "003",
      titulo: "O pedido de namoro",
      descricao: "6 registros · uma surpresa especial",
      recuperada: carta003Recuperada,
      liberado: carta002Recuperada,
      rota: "/caso-003",
    },
    {
      numero: "004",
      titulo: "Cinco dias que ficaram",
      descricao: "6 registros · pessoas e momentos especiais",
      recuperada: carta004Recuperada,
      liberado: carta003Recuperada,
      rota: "/caso-004",
    },
    {
      numero: "005",
      titulo: "Um dia para guardar",
      descricao: "6 registros · Dia dos Namorados",
      recuperada: carta005Recuperada,
      liberado: carta004Recuperada,
      rota: "/caso-005",
    },
    {
      numero: "006",
      titulo: "A promessa que virou realidade",
      descricao: "6 registros · o último capítulo",
      recuperada: carta006Recuperada,
      liberado: carta005Recuperada,
      rota: "/caso-006",
    },
  ];

  const memorias = [
    {
      numero: "001",
      titulo: "ONDE TUDO COMEÇOU",
      imagem: "/cartas/carta-001.png",
      recuperada: carta001Recuperada,
    },
    {
      numero: "002",
      titulo: "UMA SEMANA EM CASA",
      imagem: "/cartas/carta-002.png",
      recuperada: carta002Recuperada,
    },
    {
      numero: "003",
      titulo: "O DIA EM QUE ELA DISSE SIM",
      imagem: "/cartas/carta-003.png",
      recuperada: carta003Recuperada,
    },
    {
      numero: "004",
      titulo: "CINCO DIAS QUE FICARAM",
      imagem: "/cartas/carta-004.png",
      recuperada: carta004Recuperada,
    },
    {
      numero: "005",
      titulo: "UM DIA PARA GUARDAR",
      imagem: "/cartas/carta-005.png",
      recuperada: carta005Recuperada,
    },
    {
      numero: "006",
      titulo: "A PROMESSA QUE VIROU REALIDADE",
      imagem: "/cartas/carta-006.png",
      recuperada: carta006Recuperada,
    },
  ];

  const totalMemorias = memorias.filter(
    (memoria) => memoria.recuperada
  ).length;

  const totalDisponiveis = casos.filter(
    (caso) => caso.liberado
  ).length;

  return (
    <main className="win-desktop">
      <div className="win-wallpaper">
        <div className="wallpaper-decoration">
          <span>ARQUIVO 017</span>
          <small>algumas histórias merecem ser guardadas...</small>
        </div>

        <div className="desktop-icons">
          <button
            className="win-icon"
            onDoubleClick={() => abrirJanela("Meu Computador")}
            onClick={() => setMensagem("Clique duas vezes para abrir.")}
          >
            <Monitor size={31} />
            <span>Meu Computador</span>
          </button>

          <button
            className="win-icon"
            onDoubleClick={() => abrirJanela("Casos")}
            onClick={() => setMensagem("Clique duas vezes para abrir.")}
          >
            <Folder size={33} />
            <span>Casos</span>
          </button>

          <button
            className="win-icon"
            onDoubleClick={() => abrirJanela("Álbum de Memórias")}
            onClick={() => setMensagem("Clique duas vezes para abrir.")}
          >
            <Folder size={33} />
            <span>Álbum de Memórias</span>
          </button>

          <button
            className="win-icon"
            onDoubleClick={() => abrirJanela("Projetos")}
            onClick={() => setMensagem("Clique duas vezes para abrir.")}
          >
            <Folder size={33} />
            <span>Projetos</span>
          </button>

          {surpresaLiberada && (
            <button
              className="win-icon"
              onDoubleClick={() => abrirJanela("SURPRESA FINAL")}
              onClick={() => setMensagem("Clique duas vezes para abrir.")}
            >
              <Folder size={33} color="#e6c35c" />
              <span>SURPRESA FINAL</span>
            </button>
          )}

          <button
            className="win-icon"
            onDoubleClick={() => abrirJanela("Lixeira")}
            onClick={() => setMensagem("Clique duas vezes para abrir.")}
          >
            <Trash2 size={31} />
            <span>Lixeira</span>
          </button>
        </div>

        {janela && (
          <div className="win-window">
            <header className="win-titlebar">
              <div className="win-window-name">
                {janela === "Meu Computador" ? (
                  <Monitor size={15} />
                ) : janela === "Álbum de Memórias" ? (
                  <Image size={15} />
                ) : janela === "SURPRESA FINAL" ? (
                  <Star size={15} />
                ) : (
                  <Folder size={15} />
                )}
                {janela}
              </div>

              <div className="win-window-controls">
                <button aria-label="Minimizar" onClick={fecharJanela}>
                  <Minus size={12} />
                </button>
                <button aria-label="Maximizar">
                  <Square size={11} />
                </button>
                <button aria-label="Fechar" onClick={fecharJanela}>
                  <X size={13} />
                </button>
              </div>
            </header>

            {janela === "Casos" ? (
              <div className="win-window-content">
                <div className="win-address">
                  Meu Computador &gt; Arquivo Pessoal &gt; Casos
                </div>

                <div className="case-list">
                  {casos.map((caso) => (
                    <div
                      key={caso.numero}
                      className={`case-entry ${!caso.liberado ? "locked" : ""}`}
                    >
                      <div className="case-entry-main">
                        <div className="case-entry-icon">
                          {caso.recuperada ? (
                            <Check size={23} />
                          ) : caso.liberado ? (
                            <FileText size={23} />
                          ) : (
                            <Lock size={22} />
                          )}
                        </div>

                        <div className="case-entry-info">
                          <strong>
                            CASO_{caso.numero} — {caso.titulo}
                          </strong>
                          <span>{caso.descricao}</span>
                          <span className="case-entry-status">
                            {caso.recuperada
                              ? "INVESTIGAÇÃO CONCLUÍDA"
                              : caso.liberado
                                ? "DISPONÍVEL PARA INVESTIGAÇÃO"
                                : "AGUARDANDO LIBERAÇÃO"}
                          </span>
                        </div>
                      </div>

                      {caso.liberado && (
                        <button onClick={() => navigate(caso.rota)}>
                          {caso.recuperada ? "REVISAR" : "ABRIR"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="win-window-footer">
                  {casos.length} itens · {totalDisponiveis} investigações disponíveis
                </div>
              </div>
            ) : janela === "Álbum de Memórias" ? (
              <div className="win-window-content album-content">
                <div className="win-address">
                  Meu Computador &gt; Memórias &gt; Álbum
                </div>

                <div className="album-grid">
                  {Array.from({ length: 9 }).map((_, index) => {
                    const memoria = memorias[index];
                    const preenchido = memoria?.recuperada;

                    return (
                      <div
                        key={index}
                        className={`album-slot ${
                          preenchido ? "filled" : ""
                        }`}
                      >
                        {preenchido ? (
                          <>
                            <img
                              src={memoria.imagem}
                              alt={`Carta ${memoria.numero}`}
                            />
                            <strong>CARTA {memoria.numero}</strong>
                            <span>{memoria.titulo}</span>
                          </>
                        ) : (
                          <>
                            <Image size={31} />
                            <strong>ESPAÇO RESERVADO</strong>
                            <span>
                              MEMÓRIA {String(index + 1).padStart(3, "0")}
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                {totalMemorias > 0 && (
                  <div className="album-unlocked">
                    <Heart size={18} />
                    <div>
                      <strong>
                        {totalMemorias} lembrança(s) guardada(s)!
                      </strong>
                      <p>
                        Cada registro recuperado agora faz parte do álbum.
                      </p>
                    </div>
                  </div>
                )}

                <div className="win-window-footer">
                  {totalMemorias} memórias recuperadas · 9 espaços
                </div>
              </div>
            ) : janela === "SURPRESA FINAL" ? (
              <SurpresaFinal />
            ) : (
              <div className="win-window-content simple-window">
                {janela === "Meu Computador" ? (
                  <Monitor size={37} />
                ) : janela === "Lixeira" ? (
                  <Trash2 size={37} />
                ) : (
                  <Folder size={37} />
                )}

                <h2>{janela}</h2>

                <p>
                  {janela === "Projetos"
                    ? "Um lugar para guardar nossos planos e sonhos."
                    : janela === "Lixeira"
                      ? "Nenhuma lembrança foi descartada."
                      : "Bem-vinda ao Arquivo 017."}
                </p>
              </div>
            )}
          </div>
        )}

        {mensagem && !janela && (
          <div className="win-notification">{mensagem}</div>
        )}
      </div>

      <footer className="win-taskbar">
        <button
          className={`win-start ${menuIniciar ? "start-active" : ""}`}
          onClick={() => setMenuIniciar(!menuIniciar)}
        >
          <span className="start-logo">017</span>
          Iniciar
        </button>

        <div className="taskbar-divider" />

        <div className="taskbar-program">
          <Monitor size={14} />
          Arquivo 017
        </div>

        <div className="taskbar-clock">
          <span>{horario}</span>
          <small>{data}</small>
        </div>
      </footer>

      {menuIniciar && (
        <div className="win-start-menu">
          <div className="start-menu-brand">
            <span>ARQUIVO</span>
            <strong>017</strong>
          </div>

          <button onClick={() => abrirJanela("Meu Computador")}>
            <Monitor size={17} />
            Meu Computador
          </button>

          <button onClick={() => abrirJanela("Casos")}>
            <Folder size={17} />
            Casos
          </button>

          <button onClick={() => abrirJanela("Álbum de Memórias")}>
            <Image size={17} />
            Álbum de Memórias
          </button>

          <button onClick={() => abrirJanela("Projetos")}>
            <Folder size={17} />
            Projetos
          </button>

          <div className="start-menu-separator" />

          <button onClick={() => setMenuIniciar(false)}>
            <Power size={17} />
            Desligar
          </button>
        </div>
      )}
    </main>
  );
}

export default TelaAcesso;
