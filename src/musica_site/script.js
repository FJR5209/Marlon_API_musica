document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value;
    const searchType = document.getElementById('searchType').value;
    const resultDiv = document.getElementById('result');

    if (!searchInput) {
        resultDiv.innerHTML = '<p>Por favor, digite um termo de pesquisa.</p>';
        return;
    }

    const searchParams = new URLSearchParams({
        [searchType]: searchInput
    });

    // Realizar pesquisa local
    fetch(`http://localhost:3000/api/letras/search?${searchParams.toString()}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                resultDiv.innerHTML = '<h3>Resultados Locais:</h3><ul>' +
                    data.map(item => `<li><a href="music-details.html?artist=${encodeURIComponent(item.artist)}&title=${encodeURIComponent(item.title)}&album=${encodeURIComponent(item.album)}&lyrics=${encodeURIComponent(item.letra)}">${item.artist} - ${item.title}</a></li>`).join('') +
                    '</ul>';
            } else {
                resultDiv.innerHTML = '<p>Sem resultados locais, buscando na web...</p>';

                // Realizar pesquisa na web (API do Vagalume)
                fetch(`https://api.vagalume.com.br/search.${searchType}?q=${encodeURIComponent(searchInput)}&limit=5&apikey=YOUR_API_KEY`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.response.numFound > 0) {
                            resultDiv.innerHTML += '<h3>Resultados da Web:</h3><ul>' +
                                data.response.docs.map(doc => `<li><a href="music-details.html?artist=${encodeURIComponent(doc.band)}&title=${encodeURIComponent(doc.title)}&album=${encodeURIComponent(doc.album || '')}&lyrics=${encodeURIComponent(doc.lyrics || '')}">${doc.band} - ${doc.title}</a></li>`).join('') +
                                '</ul>';
                        } else {
                            resultDiv.innerHTML += '<p>Letra não encontrada.</p>';
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data from Vagalume:', error);
                        resultDiv.innerHTML += '<p>Erro ao buscar dados na web.</p>';
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching local data:', error);
            resultDiv.innerHTML = '<p>Erro ao buscar dados locais.</p>';
        });

    
});
