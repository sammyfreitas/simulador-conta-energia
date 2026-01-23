// src/utils/taxas.js

/**
 * Calcula impostos estimados (ICMS, PIS e COFINS)
 * Base simples: kWh × tarifa kWh
 */
export function calcularImpostosEstimados({
  kwh,
  tarifaKwh,
  uf,
  aliquotasPorUF,
  overrideAliquotas, // opcional { icms, pis, cofins } em %
}) {
  const seguro = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

  const kwhN = seguro(kwh);
  const tarifaN = seguro(tarifaKwh);
  const base = kwhN * tarifaN;

  const aliqUF = aliquotasPorUF?.[uf?.toUpperCase?.()] || {};
  const icmsPctOver = seguro(overrideAliquotas?.icms ?? aliqUF.icms ?? 0);
  const pisPctOver = seguro(overrideAliquotas?.pis ?? aliqUF.pis ?? 0.65);
  const cofinsPctOver = seguro(overrideAliquotas?.cofins ?? aliqUF.cofins ?? 3.0);
  const icmsPct = seguro(aliqUF.icms ?? 0);
  const pisPct = seguro(aliqUF.pis ?? 0.65);
  const cofinsPct = seguro(aliqUF.cofins ?? 3.0);

  const icms = base * (icmsPct / 100);
  const pis = base * (pisPct / 100);
  const cofins = base * (cofinsPct / 100);

  const totalImpostos = icms + pis + cofins;
  const totalComImpostos = base + totalImpostos;

  // arredondamento padrão "dinheiro"
  const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
  const arred = (v) => Math.round((v + Number.EPSILON) * 100) / 100;

  return {
    base: arred(base),
    aliquotas: { icms: icmsPct, pis: pisPct, cofins: cofinsPct },
    impostos: {
      icms: arred(icms),
      pis: arred(pis),
      cofins: arred(cofins),
      total: arred(totalImpostos)
    },
    totalComImpostos: arred(base + totalImpostos),
  };
}
