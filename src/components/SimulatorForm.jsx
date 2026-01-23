export default function SimulatorForm({ distribuidores, formulario, setFormulario, aoFinalizarEntrada }) {
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
            onChange={(e) => {
              const novaChave = e.target.value;
              const novoDistribuidor = distribuidores[novaChave];
              const primeiraCidade = novoDistribuidor?.cidades?.[0] ?? "";
              atualizar({ chaveDistribuidora: novaChave, cidade: primeiraCidade });
            }}
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
          <select
            value={formulario.cidade}
            onChange={(e) => atualizar({ cidade: e.target.value })}
            disabled={cidades.length === 0}
          >
            <option value="">
              {cidades.length === 0 ? "Em breve..." : "Selecione..."}
            </option>
            {cidades.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="small" style={{ marginTop: 6 }}>
            {cidades.length === 0
              ? "Ainda não carregamos cidades/tarifas dessa distribuidora."
              : "Futuro: cidades mudam conforme a distribuidora (Light/Enel/Cemig etc.)."}
          </div>
        </div>

      </div>

      <hr className="hr" />
      <div className="row">
        {/* Bloco ESQUERDO: datas + leituras com borda */}
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: 12
          }}
        >
          <div className="row" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <label>Data da leitura anterior</label>
              <input
                type="date"
                value={formulario.dataAnterior}
                onChange={(e) => atualizar({ dataAnterior: e.target.value })}
                style={{ padding: "10px 10px" }}
              />
            </div>
            <div>
              <label>Leitura anterior (kWh)</label>
              <input
                type="text"
                inputMode="numeric"
                value={formulario.leituraAnterior}
                onChange={(e) => atualizar({ leituraAnterior: e.target.value.replace(/[^\d.]/g, "") })}
                style={{ padding: "10px 10px" }}
              />
            </div>
          </div>

          <div className="row" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 10 }}>
            <div>
              <label>Data atual</label>
              <input
                type="date"
                value={formulario.dataAtual}
                onChange={(e) => atualizar({ dataAtual: e.target.value })}
                style={{ padding: "10px 10px" }}
              />
            </div>
            <div>
              <label>Leitura atual (kWh)</label>
              <input
                type="text"
                inputMode="numeric"
                value={formulario.leituraAtual}
                onChange={(e) => atualizar({ leituraAtual: e.target.value.replace(/[^\d.]/g, "") })}
                style={{ padding: "10px 10px" }}
              />
            </div>
          </div>
        </div>

        {/* Bloco DIREITO: duas colunas internas (lado esquerdo e lado direito) */}
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: 12
          }}
        >
          <div className="row" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {/* coluna esquerda */}
            <div>
              <label>Tipo de cliente</label>
              <select value={formulario.classe} onChange={(e) => atualizar({ classe: e.target.value })}>
                <option value="RESIDENCIAL_B1">Residencial (B1)</option>
                <option value="NAO_RESIDENCIAL">Comercial / Não residencial (B3)</option>
                <option value="RURAL_B2">Rural (B2)</option>
              </select>

              <div style={{ marginTop: 10 }}>
                <label>Bandeira tarifária</label>
                <select value={formulario.bandeira} onChange={(e) => atualizar({ bandeira: e.target.value })}>
                  <option value="VERDE">Verde</option>
                  <option value="AMARELA">Amarela</option>
                  <option value="VERMELHA_P1">Vermelha (P1)</option>
                  <option value="VERMELHA_P2">Vermelha (P2)</option>
                </select>
              </div>

              <div style={{ marginTop: 10 }}>
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
            </div>

            {/* coluna direita */}
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

              {/* (Opcional) “Outros encargos” pra multa/juros */}
              <div style={{ marginTop: 10 }}>
                <label>Outros encargos (multa/juros)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={formulario.outrosEncargos || ""}
                  onChange={(e) =>
                    atualizar({ outrosEncargos: e.target.value.replace(/[^\d.,]/g, "").replace(",", ".") })
                  }
                  onBlur={() => aoFinalizarEntrada?.()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") aoFinalizarEntrada?.();
                  }}
                  placeholder="Ex.: 12,50"
                />

                <div className="small" style={{ marginTop: 6 }}>
                  Use se houve atraso em conta anterior.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
