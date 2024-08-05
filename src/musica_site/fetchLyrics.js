// fetchLyrics.js
function fetchLetra(art, mus) {
    var url = "http://api.vagalume.com.br/search.php"
        + "?art=" + encodeURIComponent(art)
        + "&mus=" + encodeURIComponent(mus)
        + "&apikey=6962e0e1188263a8d48396eda98fe895";

    jQuery.getJSON(url, function(data) {
        if (data.type === 'notfound') {
            if (data.art.notfound) {
                $('#letra .text').html(
                    'Artista "' + art + '" não foi encontrado.<br/>'
                    + '<a target=_blank href="http://www.vagalume.com.br/add/lyrics.php">'
                    + 'Adicione esta música no Vagalume &raquo;</a>'
                );
            } else {
                $('#letra .text').html(
                    'Música "' + mus + '" de "' + art + '" não foi encontrada.<br/>'
                    + '<a target=_blank href="http://www.vagalume.com.br/add/lyrics.php">'
                    + 'Adicione esta música no Vagalume &raquo;</a>'
                );
            }
        } else {
            var letra = data.mus[0].text;
            $('#letra .text').html(letra);
        }
    }).fail(function() {
        $('#letra .text').html('Erro ao buscar letra da música. Por favor, tente novamente mais tarde.');
    });
}

$(document).ready(function() {
    $('#search').on('click', function() {
        var artist = $('#artist').val();
        var title = $('#title').val();
        if (artist && title) {
            fetchLetra(artist, title);
        } else {
            alert('Por favor, insira o nome do artista e da música.');
        }
    });
});
