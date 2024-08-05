// Função para carregar dados
function loadData(url, elementId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const listElement = document.getElementById(elementId);
            listElement.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name || item.title; // Ajuste conforme os campos do seu modelo
                listElement.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Página de Álbuns
if (document.getElementById('albumList')) {
    loadData('http://localhost:3000/api/albums', 'albumList');
}

// Página de Músicas
if (document.getElementById('musicList')) {
    loadData('http://localhost:3000/api/musics', 'musicList');
}

// Página de Artistas
if (document.getElementById('artistList')) {
    loadData('http://localhost:3000/api/artists', 'artistList');
}

// Página de Adicionar Música
if (document.getElementById('addMusicForm')) {
    document.getElementById('addMusicForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const artist = document.getElementById('artist').value;
        const album = document.getElementById('album').value;

        fetch('http://localhost:3000/api/musics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, artist, album }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Música adicionada com sucesso!');
                document.getElementById('addMusicForm').reset();
            })
            .catch(error => console.error('Error adding music:', error));
    });
}
