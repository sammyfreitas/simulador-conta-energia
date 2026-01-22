export default function Header() {
  const links = [
    { rotulo: "WhatsApp", href: "https://wa.me/55SEUNUMEROAQUI", icone: "📱" },
    { rotulo: "GitHub", href: "https://github.com/SEUUSER", icone: "💻" },
    { rotulo: "LinkedIn", href: "https://www.linkedin.com/in/SEUPERFIL", icone: "🔗" },
    { rotulo: "Instagram", href: "https://instagram.com/anthony_tijuduke", icone: "📸" },
    { rotulo: "Facebook", href: "https://facebook.com/SEUPERFIL", icone: "📘" },
    { rotulo: "Portfólio", href: "https://SEU-PORTFOLIO.com", icone: "🧩" }
  ];

  return (
    <div
      className="card"
      style={{
        padding: 16,
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}
    >
      <div>
        <h1 className="h1">Simulador de Conta de Energia (Light/RJ)</h1>
        <p className="sub">Estimativa até agora + projeção mantendo o consumo.</p>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
        {links.map((l) => (
          <a
            key={l.rotulo}
            className="badge"
            href={l.href}
            target="_blank"
            rel="noreferrer"
            title={l.rotulo}
            style={{ textDecoration: "none" }}
          >
            <span aria-hidden="true">{l.icone}</span>
            <span>{l.rotulo}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
