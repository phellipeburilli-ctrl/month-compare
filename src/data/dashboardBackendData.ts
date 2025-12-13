
import { getProductColor as getProductColorOriginal } from "./dashboardData";

export interface ProcessedData {
    name: string;
    value: number;
    percentage: number;
}

export const totalBackendOutubro = 359;
export const totalBackendNovembro = 386;

export const tipoTarefaOutubro = [
    {
        "name": "Feature",
        "value": 350,
        "percentage": 97.49
    },
    {
        "name": "Improvement",
        "value": 8,
        "percentage": 2.23
    },
    {
        "name": "Documentation",
        "value": 1,
        "percentage": 0.28
    }
];
export const tipoTarefaNovembro = [
    {
        "name": "Feature",
        "value": 382,
        "percentage": 98.96
    },
    {
        "name": "Improvement",
        "value": 4,
        "percentage": 1.04
    }
];

export const responsavelOutubro = [
    {
        "name": "Victoria Regina",
        "value": 70,
        "percentage": 19.5
    },
    {
        "name": "Eliane Santos",
        "value": 61,
        "percentage": 16.99
    },
    {
        "name": "Rodrigo Paes",
        "value": 56,
        "percentage": 15.6
    },
    {
        "name": "Tharissa Sanches",
        "value": 44,
        "percentage": 12.26
    },
    {
        "name": "Emilly Miller",
        "value": 28,
        "percentage": 7.8
    },
    {
        "name": "Pedro Vilela Amelotti",
        "value": 26,
        "percentage": 7.24
    },
    {
        "name": "Moisés Costa",
        "value": 22,
        "percentage": 6.13
    },
    {
        "name": "Felipe Godoy",
        "value": 17,
        "percentage": 4.74
    },
    {
        "name": "Bruno Carvalho",
        "value": 16,
        "percentage": 4.46
    },
    {
        "name": "Webert Cunha",
        "value": 7,
        "percentage": 1.95
    },
    {
        "name": "Pedro Santiago",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Wesley Nunes",
        "value": 5,
        "percentage": 1.39
    },
    {
        "name": "Matheus Kaio",
        "value": 5,
        "percentage": 1.39
    },
    {
        "name": "Ester Resende",
        "value": 3,
        "percentage": 0.84
    },
    {
        "name": "Mariana Freitas",
        "value": 2,
        "percentage": 0.56
    },
    {
        "name": "Paulo Mitis",
        "value": 1,
        "percentage": 0.28
    },
    {
        "name": "Rafael Dantas Nogueira Ventura",
        "value": 1,
        "percentage": 0.28
    }
];
export const responsavelNovembro = [
    {
        "name": "Victoria Regina",
        "value": 98,
        "percentage": 25.39
    },
    {
        "name": "Rodrigo Paes",
        "value": 46,
        "percentage": 11.92
    },
    {
        "name": "Tharissa Sanches",
        "value": 39,
        "percentage": 10.1
    },
    {
        "name": "Emilly Miller",
        "value": 35,
        "percentage": 9.07
    },
    {
        "name": "Felipe Godoy",
        "value": 31,
        "percentage": 8.03
    },
    {
        "name": "Matheus Kaio",
        "value": 28,
        "percentage": 7.25
    },
    {
        "name": "Eliane Santos",
        "value": 27,
        "percentage": 6.99
    },
    {
        "name": "Caio Carneiro",
        "value": 24,
        "percentage": 6.22
    },
    {
        "name": "Moisés Costa",
        "value": 19,
        "percentage": 4.92
    },
    {
        "name": "Pedro Vilela Amelotti",
        "value": 18,
        "percentage": 4.66
    },
    {
        "name": "Bruno Carvalho",
        "value": 16,
        "percentage": 4.15
    },
    {
        "name": "Pedro Santiago",
        "value": 8,
        "percentage": 2.07
    },
    {
        "name": "João Pedro Xavier Millen Penedo",
        "value": 4,
        "percentage": 1.04
    },
    {
        "name": "Denner Silva",
        "value": 3,
        "percentage": 0.78
    },
    {
        "name": "Wesley Nunes",
        "value": 3,
        "percentage": 0.78
    },
    {
        "name": "Jamile Castro Félix",
        "value": 2,
        "percentage": 0.52
    },
    {
        "name": "Leonardo Cruz",
        "value": 2,
        "percentage": 0.52
    },
    {
        "name": "Não Atribuído",
        "value": 2,
        "percentage": 0.52
    },
    {
        "name": "Mariana Freitas",
        "value": 1,
        "percentage": 0.26
    }
];

export const moduloOutubro = [
    {
        "name": "Memyts",
        "value": 59,
        "percentage": 16.43
    },
    {
        "name": "Presgera",
        "value": 56,
        "percentage": 15.6
    },
    {
        "name": "Karylief",
        "value": 36,
        "percentage": 10.03
    },
    {
        "name": "Alitoryn",
        "value": 33,
        "percentage": 9.19
    },
    {
        "name": "Arialief",
        "value": 31,
        "percentage": 8.64
    },
    {
        "name": "Garaherb",
        "value": 15,
        "percentage": 4.18
    },
    {
        "name": "Memyts Dream",
        "value": 13,
        "percentage": 3.62
    },
    {
        "name": "Korvizol",
        "value": 12,
        "percentage": 3.34
    },
    {
        "name": "Laellium",
        "value": 11,
        "percentage": 3.06
    },
    {
        "name": "Feilaira",
        "value": 11,
        "percentage": 3.06
    },
    {
        "name": "Halegryn",
        "value": 9,
        "percentage": 2.51
    },
    {
        "name": "Danmyts",
        "value": 9,
        "percentage": 2.51
    },
    {
        "name": "Maizkidor",
        "value": 9,
        "percentage": 2.51
    },
    {
        "name": "Athentys",
        "value": 8,
        "percentage": 2.23
    },
    {
        "name": "Outros",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Alphacur",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Laellium Gut",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Nerve Box",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Todos Produtos",
        "value": 4,
        "percentage": 1.11
    },
    {
        "name": "Memyts Box",
        "value": 3,
        "percentage": 0.84
    },
    {
        "name": "Todos",
        "value": 3,
        "percentage": 0.84
    },
    {
        "name": "Blinzador",
        "value": 2,
        "percentage": 0.56
    },
    {
        "name": "Basmontex",
        "value": 2,
        "percentage": 0.56
    },
    {
        "name": "Zerevest",
        "value": 2,
        "percentage": 0.56
    },
    {
        "name": "[alitoryn",
        "value": 1,
        "percentage": 0.28
    },
    {
        "name": "Mahgryn",
        "value": 1,
        "percentage": 0.28
    },
    {
        "name": "Prduto",
        "value": 1,
        "percentage": 0.28
    },
    {
        "name": "Arialif",
        "value": 1,
        "percentage": 0.28
    },
    {
        "name": "Todas",
        "value": 1,
        "percentage": 0.28
    },
    {
        "name": "Nerv Box",
        "value": 1,
        "percentage": 0.28
    },
    {
        "name": "Recorrência",
        "value": 1,
        "percentage": 0.28
    }
];
export const moduloNovembro = [
    {
        "name": "Laellium",
        "value": 59,
        "percentage": 15.28
    },
    {
        "name": "Presgera",
        "value": 47,
        "percentage": 12.18
    },
    {
        "name": "Memyts",
        "value": 47,
        "percentage": 12.18
    },
    {
        "name": "Jertaris",
        "value": 45,
        "percentage": 11.66
    },
    {
        "name": "Garaherb",
        "value": 32,
        "percentage": 8.29
    },
    {
        "name": "Arialief",
        "value": 24,
        "percentage": 6.22
    },
    {
        "name": "Outros",
        "value": 24,
        "percentage": 6.22
    },
    {
        "name": "Blinzador",
        "value": 22,
        "percentage": 5.7
    },
    {
        "name": "Karylief",
        "value": 18,
        "percentage": 4.66
    },
    {
        "name": "Feilaira",
        "value": 12,
        "percentage": 3.11
    },
    {
        "name": "Alphacur",
        "value": 11,
        "percentage": 2.85
    },
    {
        "name": "Korvizol",
        "value": 9,
        "percentage": 2.33
    },
    {
        "name": "Lellium",
        "value": 7,
        "percentage": 1.81
    },
    {
        "name": "Alitoryn",
        "value": 6,
        "percentage": 1.55
    },
    {
        "name": "Produto",
        "value": 5,
        "percentage": 1.3
    },
    {
        "name": "Mahgryn",
        "value": 4,
        "percentage": 1.04
    },
    {
        "name": "Olisteren",
        "value": 3,
        "percentage": 0.78
    },
    {
        "name": "Zerevest",
        "value": 2,
        "percentage": 0.52
    },
    {
        "name": "Keskara",
        "value": 2,
        "percentage": 0.52
    },
    {
        "name": "Basmontex",
        "value": 2,
        "percentage": 0.52
    },
    {
        "name": "Kymezol",
        "value": 1,
        "percentage": 0.26
    },
    {
        "name": "Cucudrops",
        "value": 1,
        "percentage": 0.26
    },
    {
        "name": "Goldenfrib",
        "value": 1,
        "percentage": 0.26
    },
    {
        "name": "Controle",
        "value": 1,
        "percentage": 0.26
    },
    {
        "name": "Vergolief",
        "value": 1,
        "percentage": 0.26
    }
];

export const prioridadeOutubro = [
    {
        "name": "Normal",
        "value": 359,
        "percentage": 100
    }
];
export const prioridadeNovembro = [
    {
        "name": "Normal",
        "value": 386,
        "percentage": 100
    }
];

export const produtoBlackOutubro = [
    {
        "name": "Memyts",
        "value": 63,
        "percentage": 17.55
    },
    {
        "name": "️ Presgera",
        "value": 56,
        "percentage": 15.6
    },
    {
        "name": "Arialief Neuropathy",
        "value": 39,
        "percentage": 10.86
    },
    {
        "name": "Karylief",
        "value": 36,
        "percentage": 10.03
    },
    {
        "name": "Alitoryn",
        "value": 34,
        "percentage": 9.47
    },
    {
        "name": "Todos Produtos",
        "value": 20,
        "percentage": 5.57
    },
    {
        "name": "‍️ Danmyts",
        "value": 18,
        "percentage": 5.01
    },
    {
        "name": "️garaherb",
        "value": 15,
        "percentage": 4.18
    },
    {
        "name": "Korvizol",
        "value": 12,
        "percentage": 3.34
    },
    {
        "name": "Laellium",
        "value": 11,
        "percentage": 3.06
    },
    {
        "name": "Feilaira",
        "value": 11,
        "percentage": 3.06
    },
    {
        "name": "Halegryn",
        "value": 9,
        "percentage": 2.51
    },
    {
        "name": "Athentys",
        "value": 8,
        "percentage": 2.23
    },
    {
        "name": "Memyts Dreams",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Alphacur",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Laellium Gut",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Mahgryn",
        "value": 2,
        "percentage": 0.56
    },
    {
        "name": "Blinzador",
        "value": 2,
        "percentage": 0.56
    },
    {
        "name": "Basmontex",
        "value": 2,
        "percentage": 0.56
    },
    {
        "name": "🪸zerevest",
        "value": 2,
        "percentage": 0.56
    },
    {
        "name": "Operação Geral",
        "value": 1,
        "percentage": 0.28
    }
];
export const produtoBlackNovembro = [
    {
        "name": "Memyts",
        "value": 69,
        "percentage": 17.88
    },
    {
        "name": "Laellium",
        "value": 66,
        "percentage": 17.1
    },
    {
        "name": "️ Presgera",
        "value": 52,
        "percentage": 13.47
    },
    {
        "name": "️jertaris",
        "value": 44,
        "percentage": 11.4
    },
    {
        "name": "️garaherb",
        "value": 32,
        "percentage": 8.29
    },
    {
        "name": "Arialief Neuropathy",
        "value": 23,
        "percentage": 5.96
    },
    {
        "name": "Blinzador",
        "value": 22,
        "percentage": 5.7
    },
    {
        "name": "Karylief",
        "value": 19,
        "percentage": 4.92
    },
    {
        "name": "Feilaira",
        "value": 12,
        "percentage": 3.11
    },
    {
        "name": "Alphacur",
        "value": 11,
        "percentage": 2.85
    },
    {
        "name": "Korvizol",
        "value": 9,
        "percentage": 2.33
    },
    {
        "name": "Alitoryn",
        "value": 5,
        "percentage": 1.3
    },
    {
        "name": "Mahgryn",
        "value": 4,
        "percentage": 1.04
    },
    {
        "name": "Todos Produtos",
        "value": 4,
        "percentage": 1.04
    },
    {
        "name": "Olisteren",
        "value": 3,
        "percentage": 0.78
    },
    {
        "name": "🪸zerevest",
        "value": 2,
        "percentage": 0.52
    },
    {
        "name": "Keskara",
        "value": 2,
        "percentage": 0.52
    },
    {
        "name": "Basmontex",
        "value": 2,
        "percentage": 0.52
    },
    {
        "name": "Operação Geral",
        "value": 1,
        "percentage": 0.26
    },
    {
        "name": "Kymezol",
        "value": 1,
        "percentage": 0.26
    },
    {
        "name": "Cucudrops",
        "value": 1,
        "percentage": 0.26
    },
    {
        "name": "Goldenfrib",
        "value": 1,
        "percentage": 0.26
    },
    {
        "name": "‍ Vergolief",
        "value": 1,
        "percentage": 0.26
    }
];

export const plataformaOutubro = [
    {
        "name": "Cartpanda",
        "value": 178,
        "percentage": 49.58
    },
    {
        "name": "Todas",
        "value": 99,
        "percentage": 27.58
    },
    {
        "name": "Buygoods",
        "value": 57,
        "percentage": 15.88
    },
    {
        "name": "Digistore24",
        "value": 17,
        "percentage": 4.74
    },
    {
        "name": "Clickbank",
        "value": 4,
        "percentage": 1.11
    },
    {
        "name": "Não Informado",
        "value": 2,
        "percentage": 0.56
    },
    {
        "name": "Internet",
        "value": 2,
        "percentage": 0.56
    }
];
export const plataformaNovembro = [
    {
        "name": "Cartpanda",
        "value": 273,
        "percentage": 70.73
    },
    {
        "name": "Todas",
        "value": 74,
        "percentage": 19.17
    },
    {
        "name": "Clickbank",
        "value": 36,
        "percentage": 9.33
    },
    {
        "name": "Buygoods",
        "value": 3,
        "percentage": 0.78
    }
];

export const squadsOutubro = [
    {
        "name": "Produto",
        "value": 288,
        "percentage": 80.22
    },
    {
        "name": "Funil",
        "value": 46,
        "percentage": 12.81
    },
    {
        "name": "Backend 🪣",
        "value": 8,
        "percentage": 2.23
    },
    {
        "name": "Dados",
        "value": 8,
        "percentage": 2.23
    },
    {
        "name": "Afiliados",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Suporte ️",
        "value": 3,
        "percentage": 0.84
    }
];
export const squadsNovembro = [
    {
        "name": "Produto",
        "value": 160,
        "percentage": 41.45
    },
    {
        "name": "Funil",
        "value": 127,
        "percentage": 32.9
    },
    {
        "name": "Dados",
        "value": 50,
        "percentage": 12.95
    },
    {
        "name": "Backend 🪣",
        "value": 45,
        "percentage": 11.66
    },
    {
        "name": "Afiliados",
        "value": 2,
        "percentage": 0.52
    },
    {
        "name": "Suporte ️",
        "value": 1,
        "percentage": 0.26
    },
    {
        "name": "Tráfego",
        "value": 1,
        "percentage": 0.26
    }
];

export const nichosOutubro = [
    {
        "name": "Pain Relief",
        "value": 115,
        "percentage": 32.03
    },
    {
        "name": "Memory",
        "value": 72,
        "percentage": 20.06
    },
    {
        "name": "Tinnitus",
        "value": 36,
        "percentage": 10.03
    },
    {
        "name": "Dental",
        "value": 34,
        "percentage": 9.47
    },
    {
        "name": "Todos Produtos",
        "value": 20,
        "percentage": 5.57
    },
    {
        "name": "Energy",
        "value": 18,
        "percentage": 5.01
    },
    {
        "name": "Adulto",
        "value": 15,
        "percentage": 4.18
    },
    {
        "name": "Emagrecimento",
        "value": 13,
        "percentage": 3.62
    },
    {
        "name": "Joint",
        "value": 11,
        "percentage": 3.06
    },
    {
        "name": "Concentração",
        "value": 8,
        "percentage": 2.23
    },
    {
        "name": "Sleep",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Constipação",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Fungos",
        "value": 4,
        "percentage": 1.11
    },
    {
        "name": "Operação Geral",
        "value": 1,
        "percentage": 0.28
    }
];
export const nichosNovembro = [
    {
        "name": "Pain Relief",
        "value": 96,
        "percentage": 24.87
    },
    {
        "name": "Emagrecimento",
        "value": 72,
        "percentage": 18.65
    },
    {
        "name": "Memory",
        "value": 69,
        "percentage": 17.88
    },
    {
        "name": "Prostate",
        "value": 44,
        "percentage": 11.4
    },
    {
        "name": "Adulto",
        "value": 34,
        "percentage": 8.81
    },
    {
        "name": "Fungos",
        "value": 24,
        "percentage": 6.22
    },
    {
        "name": "Tinnitus",
        "value": 22,
        "percentage": 5.7
    },
    {
        "name": "Joint",
        "value": 14,
        "percentage": 3.63
    },
    {
        "name": "Dental",
        "value": 5,
        "percentage": 1.3
    },
    {
        "name": "Todos Produtos",
        "value": 4,
        "percentage": 1.04
    },
    {
        "name": "Operação Geral",
        "value": 1,
        "percentage": 0.26
    },
    {
        "name": "Vertigem",
        "value": 1,
        "percentage": 0.26
    }
];

export const setorXmxOutubro = [
    {
        "name": "Produto",
        "value": 179,
        "percentage": 49.86
    },
    {
        "name": "Tecnologia",
        "value": 79,
        "percentage": 22.01
    },
    {
        "name": "Design",
        "value": 56,
        "percentage": 15.6
    },
    {
        "name": "Funil",
        "value": 33,
        "percentage": 9.19
    },
    {
        "name": "Copy ️",
        "value": 6,
        "percentage": 1.67
    },
    {
        "name": "Reembolso",
        "value": 4,
        "percentage": 1.11
    },
    {
        "name": "Afiliados",
        "value": 2,
        "percentage": 0.56
    }
];
export const setorXmxNovembro = [
    {
        "name": "Produto",
        "value": 175,
        "percentage": 45.34
    },
    {
        "name": "Tecnologia",
        "value": 100,
        "percentage": 25.91
    },
    {
        "name": "Design",
        "value": 56,
        "percentage": 14.51
    },
    {
        "name": "Funil",
        "value": 51,
        "percentage": 13.21
    },
    {
        "name": "Copy ️",
        "value": 4,
        "percentage": 1.04
    }
];

// Helpers
export const getTipoTarefaColor = (name: string) => {
    const map: Record<string, string> = {
        "Bug Fix": "#EF4444",
        "Feature": "#22C55E",
        "Improvement": "#3B82F6",
        "Documentation": "#F59E0B",
        "Refactoring": "#A855F7"
    };
    return map[name] || "#94A3B8";
};

export const getModuloColor = getProductColorOriginal;
export const getProductColor = getProductColorOriginal;

// Platform colors
const PLATFORM_COLORS: Record<string, string> = {
    "Cartpanda": "#22C55E",      // Verde
    "Buygoods": "#3B82F6",       // Azul
    "Digistore24": "#F59E0B",    // Amarelo
    "Clickbank": "#EC4899",      // Rosa
    "Todas": "#A855F7",          // Roxo
    "Internet": "#06B6D4",       // Cyan
    "Não Informado": "#94A3B8",  // Cinza
};

export const getPlatformColor = (name: string): string => {
    return PLATFORM_COLORS[name] || "#94A3B8";
};

// Nicho colors - cores específicas para cada nicho real
const NICHO_COLORS: Record<string, string> = {
    // Nichos principais
    "Pain Relief": "#EF4444",        // Vermelho
    "Memory": "#A855F7",             // Roxo
    "Prostate": "#3B82F6",           // Azul
    "Dental": "#22C55E",             // Verde
    "Energy": "#F97316",             // Laranja
    "Adulto": "#EC4899",             // Rosa
    "Emagrecimento": "#8B5CF6",      // Violet
    "Joint": "#14B8A6",              // Teal
    "Concentração": "#6366F1",       // Indigo
    "Sleep": "#1D4ED8",              // Azul escuro
    "Constipação": "#84CC16",        // Lima
    "Fungos": "#F59E0B",             // Âmbar
    "Tinnitus": "#06B6D4",           // Cyan
    "Todos Produtos": "#475569",     // Slate
    "Operação Geral": "#1E293B",     // Slate escuro
    "Outros": "#94A3B8",             // Cinza
};

export const getNichoColor = (name: string): string => {
    return NICHO_COLORS[name] || "#94A3B8";
};

export const kpisBackend = {
    totalOutubro: totalBackendOutubro,
    totalNovembro: totalBackendNovembro,
    totalGeral: totalBackendOutubro + totalBackendNovembro,
    variacaoTotal: totalBackendOutubro === 0 ? 100 : Number((((totalBackendNovembro - totalBackendOutubro) / totalBackendOutubro) * 100).toFixed(1))
};

export const findBestPerformer = (data: { name: string; value: number }[]) => {
    return data.reduce((best, item) => (item.value > best.value ? item : best), data[0] || { name: 'N/A', value: 0 });
};

export const findBiggestGrowth = (
    outData: { name: string; value: number }[],
    novData: { name: string; value: number }[]
) => {
    const combined = outData.map((out) => {
        const nov = novData.find((n) => n.name === out.name);
        const novValue = nov?.value || 0;
        const growth = out.value === 0 ? (novValue > 0 ? 100 : 0) : ((novValue - out.value) / out.value) * 100;
        return { name: out.name, growth, outValue: out.value, novValue };
    });

    novData.forEach((nov) => {
        if (!outData.find((o) => o.name === nov.name)) {
            combined.push({ name: nov.name, growth: 100, outValue: 0, novValue: nov.value });
        }
    });

    return combined.reduce((best, item) => (item.growth > best.growth ? item : best), combined[0] || { name: 'N/A', growth: 0 });
};
