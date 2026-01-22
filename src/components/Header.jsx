export default function Header({ distribuidoraSelecionada, logoUrl, links }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      {/* Topo: nome/logo à esquerda e ícones à direita */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12
        }}
      >
        {/* Logo + nome */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={logoUrl}
            alt={`Logo ${distribuidoraSelecionada}`}
            onError={(e) => {
              e.currentTarget.src = `${import.meta.env.BASE_URL}logos/light.png`;
              e.currentTarget.onerror = null;
            }}
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              border: "1px solid var(--border)",
              objectFit: "contain",
              background: "#fff",
              padding: 6
            }}
          />

          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>
              {distribuidoraSelecionada}
            </div>
            <div className="small">Simulador • Baixa tensão</div>
          </div>
        </div>

        {/* Ícones (topo direito) */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {links.map((l) => (
            <a
              key={l.rotulo}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              title={l.rotulo}
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                border: "1px solid var(--border)",
                display: "grid",
                placeItems: "center",
                color: "var(--primary-dark)",
                background: "#fff",
                textDecoration: "none"
              }}
            >
              <i className={l.faClass} style={{ fontSize: 16 }} />
            </a>
          ))}
        </div>
      </div>

      {/* Título central abaixo dos ícones */}
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <h1 className="h1" style={{ margin: 0 }}>
          Simulador de Conta de Energia
        </h1>
        <p className="sub" style={{ margin: "6px 0 0" }}>
          Estimativa até agora + projeção mantendo o consumo.
        </p>
      </div>
    </div>
  );
}
