const axios = require('axios');

// Substitua pela sua chave de API do Vagalume
const API_KEY = 'SUA_API_KEY_DO_VAGALUME';

const vagalumeAPI = axios.create({
    baseURL: 'https://api.vagalume.com.br',
});

async function fetchLyrics(artist, song) {
    try {
        const response = await vagalumeAPI.get(`/search.php?art=${artist}&mus=${song}&apikey=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar letra:', error);
        throw error;
    }
}

module.exports = {
    fetchLyrics,
};
