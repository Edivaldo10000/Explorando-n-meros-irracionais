function calcularAproximacoes(maxN) {
  const dados = [];
  for (let n = 1; n <= maxN; n *= 2) {
    const eAprox = Math.pow(1 + 1 / n, n);
    dados.push({ n, valor: eAprox });
  }
  return dados;
}

function preencherTabela(dados) {
  const corpoTabela = document.querySelector("#aproximacoes tbody");
  dados.forEach(({ n, valor }) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${n}</td>
      <td>${valor.toFixed(10)}</td>
    `;
    corpoTabela.appendChild(linha);
  });
}

function desenharGrafico(dados) {
  const ctx = document.getElementById("grafico-e").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: dados.map(d => d.n),
      datasets: [{
        label: "Aproximação de e",
        data: dados.map(d => d.valor),
        borderColor: "#00796b",
        backgroundColor: "rgba(0,121,107,0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Convergência da Fórmula para o Número e"
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "n"
          }
        },
        y: {
          title: {
            display: true,
            text: "Valor Aproximado de e"
          },
          suggestedMin: 2.5,
          suggestedMax: 3.0
        }
      }
    }
  });
}

// Execução
const dados = calcularAproximacoes(4096);
preencherTabela(dados);
desenharGrafico(dados);
