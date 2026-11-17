
import { useState } from "react";
import { ArrowLeft, FileText, Heart, X } from "lucide-react";

const documentos = [
  {
    id: "poema",
    titulo: "10 Coisas que Eu Odeio em Você",
    subtitulo: "Um poema para você",
    texto: `10 coisas que eu odeio em você

Odeio o jeito que você me faz sorrir quando tudo que eu queria era ficar quietinho.

Odeio o jeito que sua voz consegue fazer qualquer distância parecer menor.

Odeio suas manias, porque agora sinto falta até delas quando não está por perto.

Odeio o seu sorriso, porque nunca consigo olhar para ele apenas uma vez.

Odeio quando você duvida de si mesma, quando eu poderia passar horas te mostrando tudo de lindo que existe em você.

Odeio como você consegue fazer meu coração sentir tanta saudade.

Odeio não poder te abraçar sempre que tenho vontade.

Odeio como você aparece nos meus pensamentos até nos momentos aleatórios do meu dia.

Odeio que, depois de conhecer você, eu não consiga imaginar tantas coisas bonitas sem te incluir nelas.

E odeio, acima de tudo, que eu não consigo olhar você.

Nem suas manias,

Nem seus defeitos,

Nem suas brincadeiras,

Nem sequer a saudade que você me faz sentir.

Porque, no fim das contas, eu amo tudo aquilo que faz você ser você.

E acho que esse é o meu maior problema, eu nunca vou encontrar dez coisas para te odiar.`,
  },
  {
    id: "carta",
    titulo: "Para Todos os Garotos que Já Amei",
    subtitulo: "Uma carta para você",
    texto: `Querida Tutu,

você pediu para escrever alguma coisa memorável, então aqui está.

minha memória de quando conheci você, ou melhor, de quando uma partida de valorant acabou mudando tanta coisa na minha vida.

eu não fazia ideia de que aquela menina com quem comecei a conversar se tornaria alguém tão importante para mim, muito menos imaginava que, depois de tudo, eu estaria aqui tentando encontrar palavras para explicar o tamanho do amor que sinto por você.

às vezes eu paro para pensar em como é engraçado o jeito que a vida funciona. de tantas pessoas que poderiam ter aparecido no meu caminho, foi você... de alguma forma, eu tive a sorte de conhecer seu sorriso, suas imitações do pica-pau, suas fases aleatórias, suas manias e esse jeitinho que é tão seu, tive a sorte de conhecer a Giovanna,

e eu amo conhecer você. amo descobrir coisas novas, perceber pequenos detalhes e encontrar motivos para me apaixonar até mesmo nos dias mais comuns. você se tornou parte dos meus pensamentos, dos meus planos e de tantas coisas que ainda quero viver.

sei que nem sempre é fácil. a distância, a saudade e os dias difíceis às vezes fazem tudo parecer mais complicado do que gostaríamos, mas não quero que as dificuldades sejam maiores do que aquilo que sentimos. não quero que você precise deixar de viver seus sonhos por minha causa, nem quero ser alguém que te faça sentir que precisa escolher entre o que deseja e o que sente por mim. quero ser justamente o contrário: alguém que esteja ao seu lado enquanto você conquista tudo aquilo que sonha.

quero estar nas suas conquistas, ouvir suas histórias quando chegar em casa, comemorar suas vitórias e dividir com você até os dias em que nada de especial acontecer. quero conhecer os lugares que você ainda deseja conhecer, experimentar aquelas comidas que nunca provamos e, um dia, poder olhar para o lado e encontrar você ali, sem precisar contar os dias para o próximo abraço.

eu sei que ainda temos muito para viver e aprender. não posso prometer que todos os dias serão fáceis, mas posso dizer que quero continuar tentando, conversando, aprendendo a amar você cada vez melhor e encontrando maneiras de fazer nossa história dar certo.

e, se a gente pretende ficar junto para sempre, oque são dois anos de residência e faculdade perto de uma vida inteira que podemos construir? não parece tanto tempo quando penso em tudo que quero viver ao seu lado.

porque, se existe uma coisa que eu tenho certeza, é que não quer apenas fazer parte dos seus momentos felizes. quero estar presente na sua vida, conhecer todas as suas versões e continuar descobrindo novos motivos para escolher você.

e se alguém me perguntasse o que eu faria diferente se pudesse voltar ao dia em que nos conhecemos, acho que minha resposta seria bem simples: nada. eu encontraria você novamente, começaria tudo outra vez e me apaixonaria por você em cada uma das nossas pequenas histórias.

eu amo você, Giovanna. e espero que daqui a muitos anos, a gente ainda esteja criando lembranças para contar, rindo das mesmas besteiras e descobrindo que todo esse tempo foi só o começo

agora e sempre.
seu Kauã`,
  },
];

function SurpresaFinal() {
  const [documentoAberto, setDocumentoAberto] = useState(null);

  const documento = documentos.find(
    (item) => item.id === documentoAberto
  );

  const botao = {
    border: "1px solid #777",
    borderRadius: 3,
    background: "linear-gradient(#fff, #dedede)",
    color: "#252525",
    padding: "8px 13px",
    fontFamily: "Tahoma, Arial, sans-serif",
    fontSize: 12,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        background: "#c0c0c0",
        padding: 16,
        height: "min(650px, calc(100vh - 150px))",
        minHeight: 300,
        overflowY: "auto",
        overflowX: "hidden",
        boxSizing: "border-box",
        fontFamily: "Tahoma, Arial, sans-serif",
        color: "#292929",
        overscrollBehavior: "contain",
      }}
    >
      {!documento ? (
        <>
          <div
            style={{
              border: "1px solid #fff",
              borderRightColor: "#777",
              borderBottomColor: "#777",
              background: "#e8e8e8",
              padding: 18,
              textAlign: "center",
              marginBottom: 18,
            }}
          >
            <Heart size={30} color="#a94b59" />
            <h2 style={{ fontSize: 18, margin: "10px 0 6px" }}>
              Você chegou até aqui.
            </h2>
            <p style={{ fontSize: 12, margin: 0, lineHeight: 1.6 }}>
              Guardei duas coisas que queria muito que você lesse.
              Escolha por onde quer começar.
            </p>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {documentos.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setDocumentoAberto(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  width: "100%",
                  padding: 14,
                  textAlign: "left",
                  background: "#f5f1e8",
                  border: "1px solid #fff",
                  borderRightColor: "#777",
                  borderBottomColor: "#777",
                  cursor: "pointer",
                  color: "#292929",
                  fontFamily: "Tahoma, Arial, sans-serif",
                }}
              >
                <FileText size={30} color="#53647a" />
                <span style={{ display: "grid", gap: 5 }}>
                  <strong style={{ fontSize: 13 }}>
                    {item.titulo}
                  </strong>
                  <span style={{ fontSize: 11, color: "#666" }}>
                    {item.subtitulo}
                  </span>
                </span>
                <span style={{ marginLeft: "auto", fontSize: 18 }}>
                  {index === 0 ? "♡" : "✉"}
                </span>
              </button>
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: 10,
              color: "#555",
              marginTop: 18,
            }}
          >
            ARQUIVO 017 · DOCUMENTOS PESSOAIS
          </p>
        </>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <button
              onClick={() => setDocumentoAberto(null)}
              style={botao}
            >
              <ArrowLeft size={13} style={{ verticalAlign: "middle" }} />{" "}
              Voltar para os documentos
            </button>

            <button
              onClick={() => setDocumentoAberto(null)}
              aria-label="Fechar documento"
              style={{ ...botao, padding: "7px 9px" }}
            >
              <X size={14} />
            </button>
          </div>

          <article
            style={{
              background: "#fffdf5",
              color: "#342f2a",
              maxWidth: 690,
              margin: "0 auto",
              padding: "clamp(22px, 5vw, 48px)",
              boxShadow: "2px 3px 8px #777",
              border: "1px solid #d8d0bd",
              minHeight: 430,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #d8cdb8",
                paddingBottom: 14,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: 3,
                  color: "#9b8064",
                }}
              >
                ARQUIVO 017 · CARTA PESSOAL
              </span>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: "normal",
                  fontSize: 21,
                  margin: "12px 0 0",
                }}
              >
                {documento.titulo}
              </h2>
            </div>

            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 16,
                lineHeight: 1.95,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {documento.texto}
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: 35,
                color: "#a48b6b",
                fontSize: 12,
              }}
            >
              ♡
            </div>
          </article>

          <div style={{ textAlign: "center", marginTop: 14, paddingBottom: 15 }}>
            <button
              onClick={() => setDocumentoAberto(null)}
              style={botao}
            >
              Voltar e escolher outra carta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SurpresaFinal;
