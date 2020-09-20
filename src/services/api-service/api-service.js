import axios from '../axios/axios';

const ApiService = {
    getAllArticles: () => {
        return axios.get('/api/public/articles');
    },

    getAllCompanies: (params) => {
        return axios.get('/api/companies', { params });
    },
    
    getCompanyBySymbol: (symbol) => {
        return axios.get('/api/companies/' + symbol);
    },

    getAllOhlcForCompany: (symbol) => {
        return axios.get('/api/companies/' + symbol + '/ohlc');
    },

    getAllCompanySymbolsForUser: (userId) => {
        return axios.get('/api/companies/symbols/forUser/' + userId);
    },

    getAllCompaniesForUser: (searchString, userId) => {
        var params = {}; 
        params["searchString"] = searchString;
        return axios.get('/api/companies/forUser/' + userId, { params });
    },

    addToMyCompanies: (userId, companySymbol) => {
        return axios.post('/api/companies/subscribe', {userId: userId, companySymbol: companySymbol});
    },

    removeFromMyCompanies: (userId, companySymbol) => {
        return axios.delete('/api/companies/subscribe/' + companySymbol + '/' + userId);
    }
}

export default ApiService;