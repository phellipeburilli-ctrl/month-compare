// Dados extraídos dos Excel de Outubro e Novembro 2025
// Outubro: 69 registros | Novembro: 45 registros

// OUTUBRO - Categorias (Tipo de Vídeo) - Total: 69
export const tipoVideoOutubro = [
  { name: "UPSELL", value: 39, percentage: 56.52 },
  { name: "TROCA DE POTE", value: 12, percentage: 17.39 },
  { name: "BOX", value: 6, percentage: 8.70 },
  { name: "VARIAÇÃO", value: 5, percentage: 7.25 },
  { name: "ADAPTAÇÃO DE PLATAFORMA", value: 2, percentage: 2.90 },
  { name: "ROUPAGEM", value: 2, percentage: 2.90 },
  { name: "LEAD", value: 2, percentage: 2.90 },
  { name: "NOVA OFERTA", value: 1, percentage: 1.45 },
];

// NOVEMBRO - Categorias (Tipo de Vídeo) - Total: 45
export const tipoVideoNovembro = [
  { name: "UPSELL", value: 19, percentage: 42.22 },
  { name: "TROCA DE POTE", value: 8, percentage: 17.78 },
  { name: "VARIAÇÃO", value: 5, percentage: 11.11 },
  { name: "MICROLEAD", value: 5, percentage: 11.11 },
  { name: "BOX", value: 2, percentage: 4.44 },
  { name: "DOWNSELL", value: 2, percentage: 4.44 },
  { name: "ADAPTAÇÃO DE PLATAFORMA", value: 1, percentage: 2.22 },
  { name: "NOVA OFERTA", value: 1, percentage: 2.22 },
  { name: "LEAD", value: 2, percentage: 4.44 },
];

// OUTUBRO - Produtos - Total: 69
export const produtoOutubro = [
  { name: "MEMYTS", value: 23, percentage: 33.33 },
  { name: "LAELLIUM", value: 10, percentage: 14.49 },
  { name: "PRESGERA", value: 10, percentage: 14.49 },
  { name: "GARAHERB", value: 5, percentage: 7.25 },
  { name: "JERTARIS", value: 5, percentage: 7.25 },
  { name: "FEILAIRA", value: 3, percentage: 4.35 },
  { name: "ARIALIEF NEUROPATHY", value: 3, percentage: 4.35 },
  { name: "ALPHACUR", value: 2, percentage: 2.90 },
  { name: "KORVIZOL", value: 2, percentage: 2.90 },
  { name: "KARYLIEF", value: 2, percentage: 2.90 },
  { name: "LAELLIUM GUT", value: 2, percentage: 2.90 },
  { name: "ARIALIEF SCIATICA", value: 1, percentage: 1.45 },
  { name: "ZEREVEST", value: 1, percentage: 1.45 },
];

// NOVEMBRO - Produtos - Total: 45
export const produtoNovembro = [
  { name: "GARAHERB", value: 15, percentage: 33.33 },
  { name: "PRESGERA", value: 7, percentage: 15.56 },
  { name: "KARYLIEF", value: 5, percentage: 11.11 },
  { name: "MEMYTS", value: 4, percentage: 8.89 },
  { name: "LAELLIUM", value: 4, percentage: 8.89 },
  { name: "JERTARIS", value: 3, percentage: 6.67 },
  { name: "ALITORYN", value: 3, percentage: 6.67 },
  { name: "MAHGRYN", value: 2, percentage: 4.44 },
  { name: "LAELLIUM GUT", value: 1, percentage: 2.22 },
  { name: "FEILAIRA", value: 1, percentage: 2.22 },
];

// Totais calculados
const totalTipoVideoOutubro = tipoVideoOutubro.reduce((sum, item) => sum + item.value, 0);
const totalTipoVideoNovembro = tipoVideoNovembro.reduce((sum, item) => sum + item.value, 0);
const totalProdutoOutubro = produtoOutubro.reduce((sum, item) => sum + item.value, 0);
const totalProdutoNovembro = produtoNovembro.reduce((sum, item) => sum + item.value, 0);

// Totais para comparação
export const totaisComparativo = [
  { metric: "Tipo de Vídeo", outubro: totalTipoVideoOutubro, novembro: totalTipoVideoNovembro, crescimento: Number((((totalTipoVideoNovembro - totalTipoVideoOutubro) / totalTipoVideoOutubro) * 100).toFixed(1)) },
  { metric: "Produto", outubro: totalProdutoOutubro, novembro: totalProdutoNovembro, crescimento: Number((((totalProdutoNovembro - totalProdutoOutubro) / totalProdutoOutubro) * 100).toFixed(1)) },
];

// Dados para gráfico de barras comparativo
export const comparativoMensal = [
  { name: "Tipo de Vídeo", Outubro: totalTipoVideoOutubro, Novembro: totalTipoVideoNovembro },
  { name: "Produto", Outubro: totalProdutoOutubro, Novembro: totalProdutoNovembro },
];

// Cores consistentes - Outubro vs Novembro
export const MONTH_COLORS = {
  outubro: "#4F7CFF",  // Azul
  novembro: "#A855F7", // Roxo XMX
};

// Cores consistentes por produto
export const PRODUCT_COLORS: Record<string, string> = {
  "MEMYTS": "#A855F7",           // Roxo primário
  "LAELLIUM": "#38BDF8",         // Azul cyan
  "PRESGERA": "#22C55E",         // Verde
  "GARAHERB": "#FACC15",         // Amarelo
  "JERTARIS": "#EC4899",         // Rosa
  "FEILAIRA": "#F97316",         // Laranja
  "ARIALIEF NEUROPATHY": "#06B6D4", // Cyan
  "ALPHACUR": "#C084FC",         // Roxo claro
  "KORVIZOL": "#F87171",         // Vermelho claro
  "KARYLIEF": "#4ADE80",         // Verde claro
  "LAELLIUM GUT": "#818CF8",     // Indigo
  "ARIALIEF SCIATICA": "#FB923C", // Laranja claro
  "ZEREVEST": "#94A3B8",         // Cinza
  "ALITORYN": "#14B8A6",         // Teal
  "MAHGRYN": "#8B5CF6",          // Violet
  "BLINZADOR": "#EAB308",        // Yellow
  "OUTROS": "#64748B",           // Slate
};

// Cores consistentes por tipo de vídeo
export const VIDEO_TYPE_COLORS: Record<string, string> = {
  "UPSELL": "#A855F7",                  // Roxo primário
  "TROCA DE POTE": "#38BDF8",           // Azul cyan
  "BOX": "#22C55E",                     // Verde
  "VARIAÇÃO": "#FACC15",                // Amarelo
  "ADAPTAÇÃO DE PLATAFORMA": "#EC4899", // Rosa
  "ROUPAGEM": "#F97316",                // Laranja
  "LEAD": "#06B6D4",                    // Cyan
  "NOVA OFERTA": "#C084FC",             // Roxo claro
  "MICROLEAD": "#F87171",               // Vermelho claro
  "DOWNSELL": "#4ADE80",                // Verde claro
  "OUTROS": "#94A3B8",                  // Cinza
};

// Função helper para obter cor do produto
export const getProductColor = (name: string): string => {
  return PRODUCT_COLORS[name.toUpperCase()] || "#94A3B8";
};

// Função helper para obter cor do tipo de vídeo
export const getVideoTypeColor = (name: string): string => {
  return VIDEO_TYPE_COLORS[name.toUpperCase()] || "#94A3B8";
};

// Helper: encontrar melhor desempenho
export const findBestPerformer = (data: Array<{ name: string; value: number; percentage?: number }>) => {
  return data.reduce((best, item) => item.value > best.value ? item : best, data[0]);
};

// Helper: encontrar pior desempenho
export const findWorstPerformer = (data: Array<{ name: string; value: number; percentage?: number }>) => {
  return data.reduce((worst, item) => item.value < worst.value ? item : worst, data[0]);
};

// Helper: calcular crescimento percentual
export const calculateGrowth = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

// KPIs principais para destaque
export const kpis = {
  totalOutubro: totalTipoVideoOutubro,
  totalNovembro: totalTipoVideoNovembro,
  totalGeral: totalTipoVideoOutubro + totalTipoVideoNovembro,
  variacaoTotal: calculateGrowth(totalTipoVideoNovembro, totalTipoVideoOutubro),
  
  // Destaques Outubro
  topProdutoOutubro: findBestPerformer(produtoOutubro),
  topCategoriaOutubro: findBestPerformer(tipoVideoOutubro),
  
  // Destaques Novembro
  topProdutoNovembro: findBestPerformer(produtoNovembro),
  topCategoriaNovembro: findBestPerformer(tipoVideoNovembro),
};

// Comparativo de produtos entre meses
export const getProductComparison = (productName: string) => {
  const outubro = produtoOutubro.find(p => p.name === productName)?.value || 0;
  const novembro = produtoNovembro.find(p => p.name === productName)?.value || 0;
  return {
    name: productName,
    outubro,
    novembro,
    variacao: calculateGrowth(novembro, outubro),
  };
};

// Comparativo de categorias entre meses
export const getCategoryComparison = (categoryName: string) => {
  const outubro = tipoVideoOutubro.find(c => c.name === categoryName)?.value || 0;
  const novembro = tipoVideoNovembro.find(c => c.name === categoryName)?.value || 0;
  return {
    name: categoryName,
    outubro,
    novembro,
    variacao: calculateGrowth(novembro, outubro),
  };
};
