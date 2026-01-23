import aliquotasPorUF from "../data/aliquotasPorUF.json";
import { calcularImpostosEstimadosPorBase } from "./taxas";

function norm(s = "") {
  return s
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove acentos
}

const CLASSE_MAP = {
  residencial: ["residencial", "casa", "domiciliar", "b1", "b1 residencial"],
  rural: ["rural", "rural b2", "b2", "agro", "agricola"],
  comercial: ["comercial", "loja", "b3", "servicos"],
  industrial: ["industrial", "industria", "a4", "a3", "a2"],
};

function acharChaveClasse(objTarifas, classeUsuario) {
  const alvo = norm(classeUsuario);
  const chaves = Object.keys(objTarifas || {});
  const chavesNorm = chaves.map((k) => ({ k, nk: norm(k) }));

  // 1) match direto
  const direto = chavesNorm.find((x) => x.nk === alvo);
  if (direto) return direto.k;

  // 2) tenta sinônimos
  const sinonimos = CLASSE_MAP[alvo] || [];
  for (const s of sinonimos) {
    const m = chavesNorm.find((x) => x.nk.includes(norm(s)) || norm(s).includes(x.nk));
    if (m) return m.k;
  }

  // 3) tentativa “contains”
  const cont = chavesNorm.find((x) => x.nk.includes(alvo));
  if (cont) return cont.k;

  return null;
}


function diasEntre(a, b) {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  const ms = db.getTime() - da.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

function numeroSeguro(n, fallback = 0) {
  const x = Number(n);
  return Number.isFinite(x) ? x : fallback;
}

function escolherTarifa(faixas, kwhProjetado) {
  for (const f of faixas) {
    if (kwhProjetado <= f.ate) return f.tarifa;
  }
  return faixas[faixas.length - 1].tarifa;
}

/**
 * tarifas: objeto do JSON (tarifasLightRJ.json etc.)
 */
export function calcularSimulacao({
  dataAnterior,
  leituraAnterior,
  dataAtual,
  leituraAtual,
  diasCiclo = 30,
  uf,
  classe,
  bandeira,
  tarifas,
  temParcelamento,
  valorParcelamento,
  outrosEncargos
}) {
  if (!dataAnterior || !dataAtual) return { erro: "Informe as datas." };

  const leituraAnt = numeroSeguro(leituraAnterior, NaN);
  const leituraAtu = numeroSeguro(leituraAtual, NaN);

  if (!Number.isFinite(leituraAnt) || !Number.isFinite(leituraAtu)) {
    return { erro: "Leituras inválidas." };
  }
  if (leituraAtu < leituraAnt) {
    return { erro: "Leitura atual não pode ser menor que a anterior." };
  }

  const dias = diasEntre(dataAnterior, dataAtual);
  if (dias <= 0) return { erro: "A data atual deve ser posterior à leitura anterior." };

  const kwhAteAgora = leituraAtu - leituraAnt;
  const kwhPorDia = kwhAteAgora / dias;

  const diasC = Math.max(1, numeroSeguro(diasCiclo, 30));
  const kwhProjetado = kwhPorDia * diasC;

  const classeCfg = tarifas?.classes?.[classe];
  if (!classeCfg) return { erro: "Classe de cliente não encontrada nas tarifas." };

  const tarifaKwh = escolherTarifa(classeCfg.faixas, kwhProjetado);
  const adicionalBandeira = tarifas?.bandeiras?.[bandeira] ?? 0;

  const energiaAteAgora = kwhAteAgora * tarifaKwh;
  const bandeiraAteAgora = kwhAteAgora * adicionalBandeira;

  const energiaProjetada = kwhProjetado * tarifaKwh;
  const bandeiraProjetada = kwhProjetado * adicionalBandeira;

  const parcelamento = temParcelamento ? Math.max(0, numeroSeguro(valorParcelamento, 0)) : 0;

  const encargos = Math.max(0, numeroSeguro(outrosEncargos, 0));
  

  // Por enquanto sem CIP/COSIP. Depois a gente injeta por município.
  const cipCosip = 0;

  // Parcelamento e encargos são FIXOS (entram no total final/projeção, não no "até agora")
  const parcelamentoRateado = 0;
  const encargosRateados = 0;

// "Até agora": estimado somente consumo (sem parcelamento/encargos)
  const totalAteAgora = energiaAteAgora + bandeiraAteAgora + cipCosip;
  const totalProjetado = energiaProjetada + bandeiraProjetada + cipCosip + parcelamento + encargos;

  // ===== Impostos estimados =====
  // Base de impostos: (energia + bandeira). Parcelamento/encargos ficam fora (fixos, não consumo).
  const ufUsada = (uf || tarifas?.uf || "RJ").toUpperCase();

  const baseImpostosAteAgora = energiaAteAgora + bandeiraAteAgora;
  const baseImpostosProjetado = energiaProjetada + bandeiraProjetada;

  const impostosAteAgora = calcularImpostosEstimadosPorBase({
    baseValor: baseImpostosAteAgora,
    uf: ufUsada,
    aliquotasPorUF,
  });

  const impostosProjetado = calcularImpostosEstimadosPorBase({
    baseValor: baseImpostosProjetado,
    uf: ufUsada,
    aliquotasPorUF,
  });

  const totalAteAgoraComImpostos = totalAteAgora + impostosAteAgora.impostos.total;
  const totalProjetadoComImpostos = totalProjetado + impostosProjetado.impostos.total;


  return {
    erro: null,
    dias,
    diasCiclo: diasC,
    kwhAteAgora,
    kwhPorDia,
    kwhProjetado,
    tarifaKwh,
    adicionalBandeira,
    energiaAteAgora,
    bandeiraAteAgora,
    energiaProjetada,
    bandeiraProjetada,
    cipCosip,
    parcelamento,
    totalAteAgora,
    totalProjetado,
    parcelamentoRateado,
    encargos,
    encargosRateados,
    ufUsada,
    impostosAteAgora,
    impostosProjetado,
    totalAteAgoraComImpostos,
    totalProjetadoComImpostos

  };
}

export function formatarMoeda(valor) {
  return (Number(valor) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarNumero(valor, casas = 2) {
  return (Number(valor) || 0).toFixed(casas);
}
