# Exemplo simples do uso da biblitoeca NodeJS

Este projeto está considerando que um servidor com Elasticsearch 2.4 já existe e está acessível.

Documentação oficial do Elasticsearch 2.4:  https://www.elastic.co/guide/en/elasticsearch/reference/2.4/index.html

Específico para a API Search: 
- https://www.elastic.co/guide/en/elasticsearch/reference/2.4/search.html
- https://www.elastic.co/guide/en/elasticsearch/guide/2.x/search-in-depth.html (página principal dos tópicos relacionados a diferentas formas de pesquisa)
- https://www.elastic.co/guide/en/elasticsearch/reference/2.4/search-request-body.html
- https://www.elastic.co/guide/en/elasticsearch/guide/2.x/_how_match_uses_bool.html (muito útil para combinar diferentes formas de executar a busca)
- https://www.elastic.co/guide/en/elasticsearch/guide/2.x/bool-query.html (outra forma de combinar queries)
- https://www.elastic.co/guide/en/elasticsearch/guide/2.x/match-query.html (explicação como funciona o Match Query)
- https://www.elastic.co/guide/en/elasticsearch/guide/2.x/term-vs-full-text.html (explicação sobre tipo de busca com terms e full-text)


Para fins de criação deste exemplo, foi utilizado Docker para iniciar um servidor local de teste.

```
docker run -d --name docker-teste-2.4 -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:2.4
```

Verificar se o serviço está disponível localmente (linux) ou acesse o navegador para visualizar caso prefira:

```
curl http://localhost:9200
```

Resultado:

```json
    {
    "name" : "Sphinx",
    "cluster_name" : "elasticsearch",
    "cluster_uuid" : "37-KeMJBRnKP-XaB2M442w",
    "version" : {
        "number" : "2.4.6",
        "build_hash" : "5376dca9f70f3abef96a77f4bb22720ace8240fd",
        "build_timestamp" : "2017-07-18T12:17:44Z",
        "build_snapshot" : false,
        "lucene_version" : "5.5.4"
    },
    "tagline" : "You Know, for Search"
    }
```


Caso tenha iniciado o serviço localmente, não esqueça de pará-lo após o término do uso:

```
docker rm -f docker-teste-2.4
```

## Dados de Exemplo

Este projeto possui um método para criação de um índice de exemplo, somente utilize-o caso esteja utilizando um servidor no ambiente *LOCAL*!

Os dados estão no arquivo data.json na raiz do projeto.