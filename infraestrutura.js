
const fs = require('fs'),
    constantes = require('./constantes');

module.exports.inicializarIndiceTeste = async (esClient) => {
    console.log('Criar índice básico e carregar dados de exemplo...')

    await esClient.indices.delete({ index: constantes.NOME_INDICE });

    await esClient.indices.create({
        index: constantes.NOME_INDICE,
        body: {
            "settings": {
                "analysis": {
                    "analyzer": {
                        "folding": {
                            "type": "custom",
                            "tokenizer": "standard",
                            "filter": [
                                "standard",
                                "lowercase",
                                "brazilian_stop",
                                "asciifolding"
                            ]
                        }
                    },
                    "filter": {
                        "brazilian_stop": {
                            "type": "stop",
                            "stopwords": "_brazilian_"
                        }
                    }
                }
            },
            "mappings": {
                "documento": {
                    "properties": {
                        "texto": {
                            "type": "string",
                            "analyzer": "folding"
                        }
                    }
                }
            }
        }

    });

    const bulkIndex = async function bulkIndex(data) {
        const body = data.flatMap(doc => [{ index: { _index: constantes.NOME_INDICE } }, doc])

        // console.log('bulkBody', JSON.stringify(body))

        await esClient.bulk({ refresh: true, body, type: constantes.DOCUMENTO_INDICE });
    };

    await bulkIndex(JSON.parse(fs.readFileSync('data.json')));

    console.log('Dados de exemplo carregados no índice de teste.')

    esClient.cat.indices({ v: true })
        .then(console.log)
        .catch(err => console.error(`Error connecting to the es client: ${err}`));
}