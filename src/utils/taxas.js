// src/utils/taxas.js

/**
 * Calcula impostos estimados (ICMS, PIS, COFINS)
 * Base simples (valor em R$): baseValor
 */
export function calcularImpostosEstimadosPorBase({ baseValor, uf, aliquotasPorUF }) {
  const seguro = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

  const base = seguro(baseValor);
  const ufKey = (uf || "RJ").toUpperCase();

  const aliqUF = aliquotasPorUF?.[ufKey] || {};
  const icmsPct = seguro(aliqUF.icms ?? 0);
  const pisPct = seguro(aliqUF.pis ?? 0.65);
  const cofinsPct = seguro(aliqUF.cofins ?? 3.0);

  const icms = base * (icmsPct / 100);
  const pis = base * (pisPct / 100);
  const cofins = base * (cofinsPct / 100);

  const total = icms + pis + cofins;

  const arred = (v) => Math.round((v + Number.EPSILON) * 100) / 100;

  return {
    base: arred(base),
    aliquotas: { icms: icmsPct, pis: pisPct, cofins: cofinsPct },
    impostos: {
      icms: arred(icms),
      pis: arred(pis),
      cofins: arred(cofins),
      total: arred(total),
    },
  };
}
