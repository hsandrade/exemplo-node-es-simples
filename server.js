const elasticsearch = require('elasticsearch'),
    infra = require('./infraestrutura'),
    constantes = require('./constantes');

(async () => {

    console.log('Conectando...')

    const esClient = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'error'
    });

    console.log('Conectado.')

    await infra.inicializarIndiceTeste(esClient);

    //************************************ Exemplo 1  *************************************/
    //exemplo 01 combinando diferentes estratégias de busca
    //PRECISA atender a condição em must,
    //NÃO PRECISA atender a condição em shoud (ou seja tanto faz se encontrar ou não),
    //NÃO DEVE ter as condições em must_not (ou SEJA, DESCONSIDERAR registros que atendam estes critérios)
    const resultado1 = await esClient.search({
        index: constantes.NOME_INDICE,
        body: {
            size: 20,
            from: 0,
            query: {
                bool: {
                    must: [
                        {
                            query_string: {
                                query: '(anoDje:1 OR anoDje:5) AND (codigoDje:X)'
                            }
                        }
                    ],
                    should: [
                        {
                            match: {
                                body: {
                                    query: 'teste de busca',
                                    type: 'phrase'
                                }
                            }
                        }
                    ],
                    must_not: [
                        {
                            range: {
                                dataPublicacao: {
                                    gte: "2020-01-01",
                                    lte: "2020-01-30"
                                }
                            }
                        }
                    ]
                }
            }
        }
    })

    console.log("Resultado 1: ", resultado1.hits.hits.map(item => item._source));

    //************************************ Exemplo 2  *************************************/
    //realiza uma busca em diferentes campos de uma só vez,
    //tendo que retonar registros que atendam o critério em pelo menos 1 dos campos
    const resultado2 = await esClient.search({
        index: constantes.NOME_INDICE,
        body: {
            size: 20,
            from: 0,
            query: {
                multi_match: {
                    query: 'xpto',
                    fields: ['codigoCaderno', 'texto'],
                    minimum_should_match: 1
                }
            }
        }
    })

    console.log("\n\n\n Resultado 2: ", resultado2.hits.hits.map(item => item._source));
})();
