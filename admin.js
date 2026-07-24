// --- LÓGICA DO PAINEL ADMINISTRATIVO ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Salvar e Carregar Horários
    const formHorarios = document.getElementById('form-horarios');
    if (formHorarios) {
        // Carregar salvos
        document.getElementById('horario-semana').value = localStorage.getItem('horario_semana') || '';
        document.getElementById('horario-sabado').value = localStorage.getItem('horario_sabado') || '';
        document.getElementById('horario-domingo').value = localStorage.getItem('horario_domingo') || '';

        formHorarios.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('horario_semana', document.getElementById('horario-semana').value);
            localStorage.setItem('horario_sabado', document.getElementById('horario-sabado').value);
            localStorage.setItem('horario_domingo', document.getElementById('horario-domingo').value);
            alert('Horários atualizados com sucesso!');
        });
    }

    // 2. Gerenciar Notícias
    const formNoticias = document.getElementById('form-noticias');
    if (formNoticias) {
        renderLista('noticias', 'lista-noticias', (item) => `${item.titulo} (${item.data})`);

        formNoticias.addEventListener('submit', (e) => {
            e.preventDefault();
            const novaNoticia = {
                id: Date.now(),
                titulo: document.getElementById('noticia-titulo').value,
                data: document.getElementById('noticia-data').value,
                resumo: document.getElementById('noticia-resumo').value
            };
            addItem('noticias', novaNoticia);
            formNoticias.reset();
            renderLista('noticias', 'lista-noticias', (item) => `${item.titulo} (${item.data})`);
        });
    }

    // 3. Gerenciar Eventos
    const formEventos = document.getElementById('form-eventos');
    if (formEventos) {
        renderLista('eventos', 'lista-eventos', (item) => `${item.titulo} [${item.slug}]`);

        formEventos.addEventListener('submit', (e) => {
            e.preventDefault();
            const novoEvento = {
                id: Date.now(),
                titulo: document.getElementById('evento-titulo').value,
                data: document.getElementById('evento-data').value,
                slug: document.getElementById('evento-slug').value,
                descricao: document.getElementById('evento-descricao').value
            };
            addItem('eventos', novoEvento);
            formEventos.reset();
            renderLista('eventos', 'lista-eventos', (item) => `${item.titulo} [${item.slug}]`);
        });
    }

    // 4. Gerenciar Galeria
    const formGaleria = document.getElementById('form-galeria');
    if (formGaleria) {
        renderLista('galeria', 'lista-galeria', (item) => `${item.legenda || 'Foto'} - Álbum: ${item.album}`);

        formGaleria.addEventListener('submit', (e) => {
            e.preventDefault();
            const novaFoto = {
                id: Date.now(),
                album: document.getElementById('galeria-album').value,
                url: document.getElementById('galeria-url').value,
                legenda: document.getElementById('galeria-legenda').value
            };
            addItem('galeria', novaFoto);
            formGaleria.reset();
            renderLista('galeria', 'lista-galeria', (item) => `${item.legenda || 'Foto'} - Álbum: ${item.album}`);
        });
    }
});

// Funções Auxiliares de Armazenamento Local
function getStorageData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function addItem(key, item) {
    const data = getStorageData(key);
    data.push(item);
    localStorage.setItem(key, JSON.stringify(data));
}

function removeItem(key, id) {
    let data = getStorageData(key);
    data = data.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(data));
}

function renderLista(key, containerId, formatLabel) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const items = getStorageData(key);

    if (items.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">Nenhum item cadastrado.</p>';
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="admin-item">
            <span>${formatLabel(item)}</span>
            <button class="btn-danger" onclick="deletarItem('${key}', ${item.id}, '${containerId}', ${formatLabel})">
                <i class="fas fa-trash"></i> Excluir
            </button>
        </div>
    `).join('');
}

function deletarItem(key, id, containerId, formatLabel) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        removeItem(key, id);
        renderLista(key, containerId, formatLabel);
    }
}