export default function ModalAjudaLeituras({ open, onClose }) {
  if (!open) return null;

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <div className="modalTop">
          <div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>
              Onde encontro a leitura anterior e a leitura atual?
            </div>
            <div className="small" style={{ marginTop: 2 }}>
              Use a conta do mês anterior + o medidor (relógio) de hoje.
            </div>
          </div>

          <button type="button" className="btnGhost" onClick={onClose}>
            Fechar
          </button>
        </div>

        <div className="modalBody">
          <div className="helpText">
            <p>
              <b>Leitura anterior</b>: geralmente está na <b>conta do mês anterior</b>,
              no campo <b>“Leitura Atual” ou "Última Leitura"</b>.
            </p>
            <p>
              <b>Leitura Hoje</b>: você pode pegar <b>direto no medidor</b> (relógio)
              hoje.
            </p>

            <div className="small" style={{ marginTop: 8 }}>
              Dica: se você está usando a conta anterior como referência, a “última leitura”
              dela é a sua leitura anterior. A leitura atual você confere no medidor.
            </div>
          </div>

          <div className="imgWrap">
            <div className="imgStage">
              {/* Imagem exemplo (coloque em public/ajuda/conta-exemplo.png) */}
              <img
                src={`${baseUrl}ajuda/conta-exemplo.png`}
                alt="Exemplo de conta com os campos de leitura destacados"
                className="helpImg"
                onError={(e) => {
                  e.currentTarget.alt =
                    "Imagem não encontrada. Coloque o arquivo em public/ajuda/conta-exemplo.png";
                }}
              />

              {/* CÍRCULOS VERMELHOS (ajuste posições depois) */}
              <span className="hotspot" style={{ left: "12%", top: "28%", width: 160, height: 58 }} />
              <span className="hotspot" style={{ left: "60%", top: "28%", width: 160, height: 58 }} />
              <span className="hotspot" style={{ left: "12%", top: "45%", width: 200, height: 58 }} />
            </div>

            <div className="small" style={{ marginTop: 6 }}>
              Campos destacados em vermelho (exemplo): <b>Última leitura</b>, <b>Leitura atual</b> e <b>Consumo (kWh)</b>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
