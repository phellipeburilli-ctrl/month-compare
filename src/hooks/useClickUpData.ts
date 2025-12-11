import { useState, useEffect, useCallback } from 'react';

// Configuração
const LIST_ID = '901306312348';
const APPROVED_STATUS = 'aprovado';

// Datas em Unix timestamp (milissegundos)
const OCTOBER_2025_START = new Date('2025-10-01T00:00:00Z').getTime();
const OCTOBER_2025_END = new Date('2025-10-31T23:59:59Z').getTime();
const NOVEMBER_2025_START = new Date('2025-11-01T00:00:00Z').getTime();
const NOVEMBER_2025_END = new Date('2025-11-30T23:59:59Z').getTime();

export interface ClickUpTask {
    id: string;
    name: string;
    status: {
        status: string;
        type: string;
        color: string;
    };
    date_created: string;
    date_updated: string;
    priority?: {
        id: string;
        priority: string;
        color: string;
    };
    assignees: Array<{
        id: number;
        username: string;
        color: string;
        profilePicture?: string;
    }>;
    tags: Array<{
        name: string;
        tag_fg: string;
        tag_bg: string;
    }>;
}

export interface ProcessedData {
    name: string;
    value: number;
    percentage: number;
}

export interface BackendDashboardData {
    outubro: {
        total: number;
        tipoTarefa: ProcessedData[];
        responsavel: ProcessedData[];
        prioridade: ProcessedData[];
        modulo: ProcessedData[];
    };
    novembro: {
        total: number;
        tipoTarefa: ProcessedData[];
        responsavel: ProcessedData[];
        prioridade: ProcessedData[];
        modulo: ProcessedData[];
    };
}

// Função para buscar tarefas
async function fetchTasks(
    apiToken: string,
    dateGt: number,
    dateLt: number
): Promise<ClickUpTask[]> {
    const params = new URLSearchParams();
    params.append('include_closed', 'true');
    params.append('statuses[]', APPROVED_STATUS);
    params.append('date_created_gt', dateGt.toString());
    params.append('date_created_lt', dateLt.toString());

    const url = `https://api.clickup.com/api/v2/list/${LIST_ID}/task?${params.toString()}`;

    const response = await fetch(url, {
        headers: {
            'Authorization': apiToken,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`ClickUp API error: ${response.status}`);
    }

    const data = await response.json();
    return data.tasks || [];
}

// Função para processar tarefas por categoria
function processTasksByCategory(
    tasks: ClickUpTask[],
    extractor: (task: ClickUpTask) => string
): ProcessedData[] {
    const counts = new Map<string, number>();
    const total = tasks.length;

    tasks.forEach(task => {
        const category = extractor(task);
        counts.set(category, (counts.get(category) || 0) + 1);
    });

    return Array.from(counts.entries())
        .map(([name, value]) => ({
            name,
            value,
            percentage: Number(((value / total) * 100).toFixed(2))
        }))
        .sort((a, b) => b.value - a.value);
}

// Hook principal
export function useClickUpData(apiToken: string | null) {
    const [data, setData] = useState<BackendDashboardData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!apiToken) {
            setError('API Token não configurado');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Buscar tarefas de outubro e novembro
            const [octoberTasks, novemberTasks] = await Promise.all([
                fetchTasks(apiToken, OCTOBER_2025_START, OCTOBER_2025_END),
                fetchTasks(apiToken, NOVEMBER_2025_START, NOVEMBER_2025_END)
            ]);

            // Processar dados de outubro
            const outubroData = {
                total: octoberTasks.length,
                tipoTarefa: processTasksByCategory(octoberTasks, task =>
                    task.tags?.[0]?.name || 'Sem Tag'
                ),
                responsavel: processTasksByCategory(octoberTasks, task =>
                    task.assignees?.[0]?.username || 'Não atribuído'
                ),
                prioridade: processTasksByCategory(octoberTasks, task =>
                    task.priority?.priority || 'Normal'
                ),
                modulo: processTasksByCategory(octoberTasks, task =>
                    task.tags?.[1]?.name || task.tags?.[0]?.name || 'Geral'
                )
            };

            // Processar dados de novembro
            const novembroData = {
                total: novemberTasks.length,
                tipoTarefa: processTasksByCategory(novemberTasks, task =>
                    task.tags?.[0]?.name || 'Sem Tag'
                ),
                responsavel: processTasksByCategory(novemberTasks, task =>
                    task.assignees?.[0]?.username || 'Não atribuído'
                ),
                prioridade: processTasksByCategory(novemberTasks, task =>
                    task.priority?.priority || 'Normal'
                ),
                modulo: processTasksByCategory(novemberTasks, task =>
                    task.tags?.[1]?.name || task.tags?.[0]?.name || 'Geral'
                )
            };

            setData({
                outubro: outubroData,
                novembro: novembroData
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar dados');
        } finally {
            setLoading(false);
        }
    }, [apiToken]);

    useEffect(() => {
        if (apiToken) {
            fetchData();
        }
    }, [apiToken, fetchData]);

    return { data, loading, error, refetch: fetchData };
}

// Calcular crescimento
export function calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Number((((current - previous) / previous) * 100).toFixed(1));
}

// Storage helpers para o token
export function saveApiToken(token: string): void {
    localStorage.setItem('clickup_api_token', token);
}

export function getApiToken(): string | null {
    return localStorage.getItem('clickup_api_token');
}

export function clearApiToken(): void {
    localStorage.removeItem('clickup_api_token');
}
