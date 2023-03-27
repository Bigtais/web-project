import esClient from './es-client';

const index = 'login';


const handleElasticsearchError = (error) => {
    if (error.status === 404) {
        throw new Error('User Not Found', 404);
    }
    throw new Error(error.msg, error.status || 500);
};


const store = user => esClient.index({
    index,
    refresh: 'true',
    body: user,
}).then(response => { return response.status }).catch((error) => {
    handleElasticsearchError(error);
});


const getUser = username => esClient.search({
    index,
    body: {
        query: {
            match: {
                username: {
                    query: username
                }
            }
        }
    },
}).then(response => { return response })
    .catch((error) => {
        handleElasticsearchError(error);
    });


const getLogin = (username, password) => esClient.search({
    index,
    body: {
        query: {
            bool: {
                must: [
                    {
                        match: {
                            username: {
                                query: username
                            }
                        }
                    },
                    {
                        match: {
                            password: {
                                query: password
                            }
                        }
                    }
                ]
            }
        }
    }
}).then(response => { return response })
    .catch((error) => {
        handleElasticsearchError(error);
    });


export default {
    getUser,
    store,
    getLogin
};
