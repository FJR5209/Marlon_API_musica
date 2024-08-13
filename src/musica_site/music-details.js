window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artist = urlParams.get('artist');
    const title = urlParams.get('title');
    const album = urlParams.get('album');
    const lyrics = urlParams.get('lyrics');

    document.getElementById('musicTitle').textContent = title || 'Título não disponível';
    document.getElementById('musicArtist').textContent = artist || 'Artista não disponível';
    document.getElementById('musicAlbum').textContent = album || 'Álbum não disponível';
    document.getElementById('musicLyrics').textContent = lyrics || 'Letra não disponível';
});
