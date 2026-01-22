import { useMemo, useState, useRef } from "react";
import "./styles/theme.css";

import distribuidores from "./data/distribuidores.json";
import tarifasLightRJ from "./data/tarifasLightRJ.json";
import tarifasEnelRJ from "./data/tarifasEnelRJ.json";
import tarifasEnelSP from "./data/tarifasEnelSP.json";
import tarifasCemigMG from "./data/tarifasCemigMG.json";

import Header from "./components/Header";
import SimulatorForm from "./components/SimulatorForm";
import Resultados from "./components/Resultados";
import { calcularSimulacao } from "./utils/calculadora";

function obterTarifas(chaveDistribuidora) {
  switch (chaveDistribuidora) {
    case "LIGHT_RJ":
      return tarifasLightRJ;
    case "ENEL_RJ":
      return tarifasEnelRJ;
    case "ENEL_SP":
      return tarifasEnelSP;
    case "CEMIG_MG":
      return tarifasCemigMG;
    default:
      return tarifasLightRJ;
  }
}

export default function App() {
  const resultadosRef = useRef(null);

  function rolarParaResultados() {
    // um pequeno delay ajuda a garantir que o DOM já atualizou
    setTimeout(() => {
      resultadosRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  const [formulario, setFormulario] = useState({
    chaveDistribuidora: "LIGHT_RJ",
    cidade: "Rio de Janeiro",

    dataAnterior: "",
    leituraAnterior: "",
    dataAtual: "",
    leituraAtual: "",

    classe: "NAO_RESIDENCIAL",
    bandeira: "VERDE",
    diasCiclo: "30",

    temParcelamento: false,
    valorParcelamento: "",
    outrosEncargos: ""
  });

  // ✅ Links precisam ficar AQUI (fora do useMemo)
  const links = [
    { rotulo: "WhatsApp", href: "https://wa.me/5521986140005", faClass: "fa-brands fa-whatsapp" },
    { rotulo: "GitHub", href: "https://github.com/sammyfreitas", faClass: "fa-brands fa-github" },
    { rotulo: "LinkedIn", href: "https://www.linkedin.com/in/tony-s-freitas/", faClass: "fa-brands fa-linkedin" },
    { rotulo: "Instagram", href: "https://instagram.com/anthony_tijuduke", faClass: "fa-brands fa-instagram" },
    { rotulo: "Facebook", href: "https://www.facebook.com/anthonyfreitas78/", faClass: "fa-brands fa-facebook" },
    { rotulo: "Portfólio", href: "https://https://sammyfreitas.github.io/portfolioSite/", faClass: "fa-solid fa-globe" }
  ];

  // ✅ nomeDistribuidora também aqui
  const nomeDistribuidora =
    distribuidores?.[formulario.chaveDistribuidora]?.nome ?? "Distribuidora";
  const baseUrl = import.meta.env.BASE_URL;
  const logoUrl =
    baseUrl +
    (distribuidores[formulario.chaveDistribuidora]?.logo?.replace("/", "") ??
      "logos/light.png");
  
  

  const resultado = useMemo(() => {
    const tarifas = obterTarifas(formulario.chaveDistribuidora);

    
    return calcularSimulacao({
      dataAnterior: formulario.dataAnterior,
      leituraAnterior: formulario.leituraAnterior,
      dataAtual: formulario.dataAtual,
      leituraAtual: formulario.leituraAtual,
      diasCiclo: formulario.diasCiclo,
      classe: formulario.classe,
      bandeira: formulario.bandeira,
      tarifas,
      temParcelamento: formulario.temParcelamento,
      valorParcelamento: formulario.valorParcelamento,
      outrosEncargos: formulario.outrosEncargos
    });
  }, [formulario]);

  return (
    <div className="container">
      <Header distribuidoraSelecionada={nomeDistribuidora} logoUrl={logoUrl} links={links} />

      <SimulatorForm
        distribuidores={distribuidores}
        formulario={formulario}
        setFormulario={setFormulario}
        aoFinalizarEntrada={rolarParaResultados}
      />

      <div ref={resultadosRef}>
        <Resultados resultado={resultado} /></div>

      <footer
        className="card"
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        <div>
          <b>Simulador de Conta de Energia Elétrica</b>
          <div className="small">
            Desenvolvido por <b>Anthony Samuel Sobral De Freitas</b>, engenheiro, professor frontend e backend - Senai Maracanã, 2026.
          </div>
          <div className="small">Protótipo educacional — valores podem variar da fatura real.</div>
          <div className="small">
            ⚠️ O valor pode variar caso existam multas, juros, parcelamentos ou atraso no pagamento da fatura anterior.
          </div>
        </div>

        <div
          style={{
            width: 90,
            height: 34,
            border: "1px dashed var(--border)",
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            color: "var(--muted)",
            fontSize: 12
          }}
        >
          Logo
        </div>
      </footer>
    </div>
  );
}
