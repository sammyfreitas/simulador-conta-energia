import { formatarMoeda, formatarNumero } from "../utils/calculadora";

export default function Resultados({ resultado }) {
  if (!resultado) return null;

  if (resultado.erro) {
    return (
      <div className="card" style={{ padding: 16, borderColor: "rgba(255,0,0,0.25)" }}>
        <b>Erro:</b> {resultado.erro}
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="kpiRow">
        <div>
          <div className="small">Quanto está a conta até o momento (estimado)</div>
          <div className="kpi">{formatarMoeda(resultado.totalAteAgora)}</div>
          <div className="small">
            {formatarNumero(resultado.kwhAteAgora, 0)} kWh em {resultado.dias} dias •{" "}
            {formatarNumero(resultado.kwhPorDia)} kWh/dia
          </div>
        </div>

        <div>
          <div className="small">Projeção do mês (mantendo o consumo)</div>
          <div className="kpi">{formatarMoeda(resultado.totalProjetado)}</div>
          <div className="small">
            {formatarNumero(resultado.kwhProjetado, 0)} kWh projetados em {resultado.diasCiclo} dias
          </div>
        </div>
      </div>

      <hr className="hr" />

      <div className="row">
        <div>
          <div className="small">
            <b>Tarifa aplicada:</b> {formatarMoeda(resultado.tarifaKwh)}/kWh
          </div>
          <div className="small">
            <b>Bandeira:</b> {formatarMoeda(resultado.adicionalBandeira)}/kWh
          </div>
        </div>

        <div>
          <div className="small"><b>Energia até agora:</b> {formatarMoeda(resultado.energiaAteAgora)}</div>
          <div className="small"><b>Bandeira até agora:</b> {formatarMoeda(resultado.bandeiraAteAgora)}</div>
          <div className="small"><b>Parcelamento (mês):</b> {formatarMoeda(resultado.parcelamento)}</div>
          <div className="small"><b>Outros encargos (mês):</b> {formatarMoeda(resultado.encargos)}</div>
          <div className="small">Até o momento (estimado • somente consumo)</div>
        </div>
      </div>

      <div className="small" style={{ marginTop: 10 }}>
        * CIP/COSIP ainda não está aplicada (vamos plugar por município depois).
      </div>
    </div>
  );
}
