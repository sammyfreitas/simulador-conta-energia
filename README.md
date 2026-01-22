# Simulador de Conta de Energia

Simulador de conta de energia elétrica (baixa tensão) com estimativa de consumo até o momento e projeção do mês, incluindo opção de parcelamento e estimativa de impostos.

## Funcionalidades
- Seleção de distribuidora e cidade (base por JSON)
- Cálculo “até agora” (estimado — somente consumo)
- Projeção do mês (consumo + parcelamento + encargos)
- Bandeiras tarifárias
- Estimativa opcional de impostos (ICMS/PIS/COFINS)
- UI responsiva com identidade visual

## Tecnologias
- React + Vite
- Node.js
- Font Awesome
- GitHub Pages (deploy automático via Actions)

## Deploy (GitHub Pages)
O deploy é feito automaticamente a cada push na branch main via GitHub Actions.

Avisos importantes
* Este simulador é educacional/estimativo.
* O valor final pode variar por: regras específicas de faturamento, tributos, ajustes, CIP/COSIP, multa/juros por atraso, arredondamentos e encargos adicionais.

Autor: 
Desenvolvido por Anthony Samuel Sobral De Freitas, engenheiro, professor frontend e backend — 2026.

---

## Link público para compartilhar
https://sammyfreitas.github.io/simulador-conta-energia/

## “Futuro”: 
Simulador do impacto do valor do ar-condicionado na conta
Em breve uma segunda aba (“Impacto de Aparelhos”).

### Modelo simples e prático (funciona com a etiqueta)
A etiqueta costuma trazer algo como:
- **Consumo mensal (kWh/mês)** para um uso padrão (ex.: X horas/dia)

**Modo A — “Pela etiqueta de eficiência energética do seu aparelho”**
- Consumo da etiqueta: `kWh/mês`
- Horas/dia do padrão da etiqueta (campo com default: 8h/dia)
- Horas/dia que você vai usar
- Dias/mês

Ajuste proporcional:
- `kWh_extra = kWhEtiqueta * (horasUsuario / horasEtiqueta)`
- Custo extra = `kWh_extra * tarifa_kWh_aplicada` (+ impostos se marcado)

### Criar um app para Android
- Com Simulador de Ar Condicionado
- Abas no topo: “Conta” | “Ar-condicionado”

## Como rodar localmente
```bash
npm install
npm run dev

