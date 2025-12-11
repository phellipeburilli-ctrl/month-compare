// Script para buscar dados do ClickUp
// Execute com: node scripts/fetchClickUpData.js

const API_TOKEN = 'pk_55083349_CIKL4G8FKE1CETSQJ18ZTHOOGQY74WMV';
const LIST_ID = '901306312348';

// Datas em Unix timestamp (milissegundos)
const OCTOBER_START = new Date('2025-10-01T00:00:00Z').getTime();
const OCTOBER_END = new Date('2025-10-31T23:59:59Z').getTime();
const NOVEMBER_START = new Date('2025-11-01T00:00:00Z').getTime();
const NOVEMBER_END = new Date('2025-11-30T23:59:59Z').getTime();

async function fetchTasks(dateGt, dateLt, status = 'aprovado') {
    const params = new URLSearchParams();
    params.append('include_closed', 'true');
    params.append('statuses[]', status);
    params.append('date_created_gt', dateGt.toString());
    params.append('date_created_lt', dateLt.toString());

    const url = `https://api.clickup.com/api/v2/list/${LIST_ID}/task?${params.toString()}`;

    console.log('Fetching:', url);

    const response = await fetch(url, {
        headers: {
            'Authorization': API_TOKEN,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('Error:', response.status, error);
        return null;
    }

    const data = await response.json();
    return data.tasks || [];
}

function processTasksByCategory(tasks, categoryExtractor, categoryName) {
    const counts = new Map();

    tasks.forEach(task => {
        const category = categoryExtractor(task);
        counts.set(category, (counts.get(category) || 0) + 1);
    });

    const total = tasks.length;
    const result = Array.from(counts.entries())
        .map(([name, value]) => ({
            name,
            value,
            percentage: Number(((value / total) * 100).toFixed(2))
        }))
        .sort((a, b) => b.value - a.value);

    console.log(`\n=== ${categoryName} ===`);
    result.forEach(item => console.log(`  ${item.name}: ${item.value} (${item.percentage}%)`));

    return result;
}

async function main() {
    console.log('=== Buscando dados do ClickUp ===\n');

    // Buscar tarefas de outubro
    console.log('--- OUTUBRO 2025 ---');
    const octoberTasks = await fetchTasks(OCTOBER_START, OCTOBER_END);

    if (octoberTasks) {
        console.log(`Total de tarefas em Outubro: ${octoberTasks.length}`);

        // Por responsável
        processTasksByCategory(
            octoberTasks,
            task => task.assignees?.[0]?.username || 'Não atribuído',
            'Responsáveis (Outubro)'
        );

        // Por prioridade
        processTasksByCategory(
            octoberTasks,
            task => task.priority?.priority || 'Normal',
            'Prioridades (Outubro)'
        );

        // Por tag
        processTasksByCategory(
            octoberTasks,
            task => task.tags?.[0]?.name || 'Sem tag',
            'Tags (Outubro)'
        );
    }

    // Buscar tarefas de novembro
    console.log('\n--- NOVEMBRO 2025 ---');
    const novemberTasks = await fetchTasks(NOVEMBER_START, NOVEMBER_END);

    if (novemberTasks) {
        console.log(`Total de tarefas em Novembro: ${novemberTasks.length}`);

        // Por responsável
        processTasksByCategory(
            novemberTasks,
            task => task.assignees?.[0]?.username || 'Não atribuído',
            'Responsáveis (Novembro)'
        );

        // Por prioridade
        processTasksByCategory(
            novemberTasks,
            task => task.priority?.priority || 'Normal',
            'Prioridades (Novembro)'
        );

        // Por tag
        processTasksByCategory(
            novemberTasks,
            task => task.tags?.[0]?.name || 'Sem tag',
            'Tags (Novembro)'
        );
    }

    // Gerar código para dashboardBackendData.ts
    if (octoberTasks && novemberTasks) {
        console.log('\n\n=== CÓDIGO GERADO PARA dashboardBackendData.ts ===\n');
        console.log('// Copie e cole no arquivo dashboardBackendData.ts');
        console.log(`\nexport const totalBackendOutubro = ${octoberTasks.length};`);
        console.log(`export const totalBackendNovembro = ${novemberTasks.length};`);
    }
}

main().catch(console.error);
