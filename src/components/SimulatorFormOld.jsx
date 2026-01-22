export default function SimulatorForm({ distribuidores, formulario, setFormulario }) {
  const distribuidor = distribuidores[formulario.chaveDistribuidora];
  const cidades = distribuidor?.cidades ?? [];

  function atualizar(patch) {
    setFormulario((prev) => ({ ...prev, ...patch }));
  }

  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="row">
        <div>
          <label>Distribuidora</label>
          <select
            value={formulario.chaveDistribuidora}
            onChange={(e) => atualizar({ chaveDistribuidora: e.target.value, cidade: "" })}
          >
            {Object.entries(distribuidores).map(([chave, d]) => (
              <option key={chave} value={chave}>
                {d.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Cidade (permitidas)</label>
          <select value={formulario.cidade} onChange={(e) => atualizar({ cidade: e.target.value })}>
            <option value="">Selecione...</option>
            {cidades.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="small" style={{ marginTop: 6 }}>
            Futuro: cidades mudam conforme a distribuidora (Light/Enel/Cemig etc.).
          </div>
        </div>
      </div>

      <hr className="hr" />

      <div className="row">
        <div>
          <label>Data da leitura anterior</label>
          <input
            type="date"
            value={formulario.dataAnterior}
            onChange={(e) => atualizar({ dataAnterior: e.target.value })}
          />
        </div>

        <div>
          <label>Leitura anterior (kWh do medidor)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Ex.: 12345"
            value={formulario.leituraAnterior}
            onChange={(e) => atualizar({ leituraAnterior: e.target.value.replace(/[^\d.]/g, "") })}
          />
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div>
          <label>Data atual</label>
          <input
            type="date"
            value={formulario.dataAtual}
            onChange={(e) => atualizar({ dataAtual: e.target.value })}
          />
        </div>

        <div>
          <label>Leitura atual (kWh do medidor)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Ex.: 12520"
            value={formulario.leituraAtual}
            onChange={(e) => atualizar({ leituraAtual: e.target.value.replace(/[^\d.]/g, "") })}
          />
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div>
          <label>Tipo de cliente</label>
          <select value={formulario.classe} onChange={(e) => atualizar({ classe: e.target.value })}>
            <option value="RESIDENCIAL_B1">Residencial (B1)</option>
            <option value="NAO_RESIDENCIAL">Não residencial</option>
            <option value="RURAL_B2">Rural (B2)</option>
          </select>
        </div>

        <div>
          <label>Bandeira tarifária</label>
          <select value={formulario.bandeira} onChange={(e) => atualizar({ bandeira: e.target.value })}>
            <option value="VERDE">Verde</option>
            <option value="AMARELA">Amarela</option>
            <option value="VERMELHA_P1">Vermelha (P1)</option>
            <option value="VERMELHA_P2">Vermelha (P2)</option>
          </select>
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div>
          <label>Dias do ciclo (projeção)</label>
          <input
            type="text"
            inputMode="numeric"
            value={formulario.diasCiclo}
            onChange={(e) => atualizar({ diasCiclo: e.target.value.replace(/[^\d]/g, "") })}
            placeholder="30"
          />
          <div className="small" style={{ marginTop: 6 }}>Se não souber, deixe 30.</div>
        </div>

        <div>
          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={formulario.temParcelamento}
              onChange={(e) => atualizar({ temParcelamento: e.target.checked })}
              style={{ width: 18, height: 18 }}
            />
            Tem parcelamento?
          </label>

          <input
            type="text"
            inputMode="decimal"
            disabled={!formulario.temParcelamento}
            value={formulario.valorParcelamento}
            onChange={(e) =>
              atualizar({ valorParcelamento: e.target.value.replace(/[^\d.,]/g, "").replace(",", ".") })
            }
            placeholder="Valor do parcelamento (R$)"
          />
        </div>
      </div>
    </div>
  );
}
