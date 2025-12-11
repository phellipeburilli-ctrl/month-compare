// Dados extraídos dos Excel de Outubro e Novembro 2025 - Dashboard ADS
// Outubro: 51 registros | Novembro: 48 registros

// OUTUBRO - Produtos - Total: 51
export const produtoAdsOutubro = [
  { name: "MEMYTS", value: 28, percentage: 54.90 },
  { name: "LAELLIUM", value: 17, percentage: 33.33 },
  { name: "GARAHERB", value: 2, percentage: 3.92 },
  { name: "BLINZADOR", value: 2, percentage: 3.92 },
  { name: "KARYLIEF", value: 1, percentage: 1.96 },
  { name: "VAZIO", value: 1, percentage: 1.96 },
];

// NOVEMBRO - Produtos - Total: 48
export const produtoAdsNovembro = [
  { name: "KARYLIEF", value: 17, percentage: 35.42 },
  { name: "MEMYTS", value: 13, percentage: 27.08 },
  { name: "JERTARIS", value: 10, percentage: 20.83 },
  { name: "GARAHERB", value: 4, percentage: 8.33 },
  { name: "BLINZADOR", value: 3, percentage: 6.25 },
  { name: "KORVIZOL", value: 1, percentage: 2.08 },
];

// OUTUBRO - Nichos - Total: 51
export const nichoOutubro = [
  { name: "MEMORY", value: 28, percentage: 54.90 },
  { name: "EMAGRECIMENTO", value: 17, percentage: 33.33 },
  { name: "ADULTO", value: 2, percentage: 3.92 },
  { name: "FUNGOS", value: 2, percentage: 3.92 },
  { name: "TINNITUS", value: 1, percentage: 1.96 },
  { name: "VAZIO", value: 1, percentage: 1.96 },
];

// NOVEMBRO - Nichos - Total: 48
export const nichoNovembro = [
  { name: "TINNITUS", value: 18, percentage: 37.50 },
  { name: "MEMORY", value: 13, percentage: 27.08 },
  { name: "PROSTATE", value: 10, percentage: 20.83 },
  { name: "ADULTO", value: 3, percentage: 6.25 },
  { name: "FUNGOS", value: 3, percentage: 6.25 },
  { name: "PAIN RELIEF", value: 1, percentage: 2.08 },
];

// OUTUBRO - Squads - Total: 51
export const squadOutubro = [
  { name: "GOOGLE", value: 46, percentage: 90.20 },
  { name: "AFILIADOS", value: 5, percentage: 9.80 },
];

// NOVEMBRO - Squads - Total: 48
export const squadNovembro = [
  { name: "GOOGLE", value: 37, percentage: 77.08 },
  { name: "AFILIADOS", value: 11, percentage: 22.92 },
];

// OUTUBRO - Assignees - Total: 51
export const assigneeOutubro = [
  { name: "Rafael Andrade", value: 28, percentage: 54.90 },
  { name: "Leonardo da Silva", value: 20, percentage: 39.22 },
  { name: "Bruno Cesar", value: 3, percentage: 5.88 },
];

// NOVEMBRO - Assignees - Total: 48
export const assigneeNovembro = [
  { name: "Rafael Andrade", value: 26, percentage: 54.17 },
  { name: "Leonardo da Silva", value: 18, percentage: 37.50 },
  { name: "Amanda Peralli Machado", value: 2, percentage: 4.17 },
  { name: "Bruno Cesar", value: 1, percentage: 2.08 },
  { name: "Colaborativo", value: 1, percentage: 2.08 },
];

// Totais
export const totalAdsOutubro = 51;
export const totalAdsNovembro = 48;

// Cores por nicho
export const NICHO_COLORS: Record<string, string> = {
  "MEMORY": "#A855F7",        // Roxo primário
  "EMAGRECIMENTO": "#38BDF8", // Azul cyan
  "ADULTO": "#EC4899",        // Rosa
  "FUNGOS": "#22C55E",        // Verde
  "TINNITUS": "#FACC15",      // Amarelo
  "PROSTATE": "#F97316",      // Laranja
  "PAIN RELIEF": "#06B6D4",   // Cyan
  "VAZIO": "#64748B",         // Slate
};

// Cores por squad
export const SQUAD_COLORS: Record<string, string> = {
  "GOOGLE": "#A855F7",        // Roxo primário
  "AFILIADOS": "#FACC15",     // Amarelo
};

// Cores por produto ADS
export const PRODUTO_ADS_COLORS: Record<string, string> = {
  "MEMYTS": "#A855F7",        // Roxo
  "LAELLIUM": "#38BDF8",      // Azul
  "GARAHERB": "#22C55E",      // Verde
  "BLINZADOR": "#EC4899",     // Rosa
  "KARYLIEF": "#FACC15",      // Amarelo
  "JERTARIS": "#F97316",      // Laranja
  "KORVIZOL": "#06B6D4",      // Cyan
  "VAZIO": "#64748B",         // Slate
};

// Helpers
export const getNichoColor = (name: string): string => {
  return NICHO_COLORS[name.toUpperCase()] || NICHO_COLORS[name] || "#94A3B8";
};

export const getSquadColor = (name: string): string => {
  return SQUAD_COLORS[name.toUpperCase()] || SQUAD_COLORS[name] || "#94A3B8";
};

export const getProdutoAdsColor = (name: string): string => {
  return PRODUTO_ADS_COLORS[name.toUpperCase()] || PRODUTO_ADS_COLORS[name] || "#94A3B8";
};

// Calcular crescimento
export const calculateGrowth = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

// KPIs ADS
export const kpisAds = {
  totalOutubro: totalAdsOutubro,
  totalNovembro: totalAdsNovembro,
  totalGeral: totalAdsOutubro + totalAdsNovembro,
  variacaoTotal: calculateGrowth(totalAdsNovembro, totalAdsOutubro),
};
