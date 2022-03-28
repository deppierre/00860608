## Building the image
```
## mongo image
docker build -t mongodb_00806068 .
```

## Read catalog
```
docker rm -fv mongodb_00806068_run > /dev/null ; rm -f mongod/{ftdc,logs}/* ;\
docker run --name mongodb_00806068_run -d --rm --privileged -p 27020:27017 --memory="5g" -v $(pwd)/mongod/ftdc:/mongo/data/db/diagnostic.data -v $(pwd)/mongod/logs:/mongo/data/db/logs mongodb_00806068 > /dev/null &&\
docker exec -ti mongodb_00806068_run ls
```

```
docker exec -ti mongodb_00806068_run ./mdb_catalog .
```

## Query 1, no index
```
docker rm -fv mongodb_00806068_run > /dev/null ; rm -f mongod/{ftdc,logs}/* ;\
docker run --name mongodb_00806068_run -d --rm -p 27020:27017 --memory="5g" -v $(pwd)/mongod/ftdc:/mongo/data/db/diagnostic.data -v $(pwd)/mongod/logs:/mongo/data/db/logs mongodb_00806068 > /dev/null &&\
sleep 5; mongo --quiet "mongodb://localhost:27020" 2_page_in_cache.js &&\
mongo --quiet "mongodb://localhost:27020/dbsample" --eval 'db.sample.find({"name": "Boulevard Bistro","address.city":"Onkaczu"}).hint({$natural: 1});' > /dev/null &&\
echo "###### Query 1, no index" ;\
mongo --quiet "mongodb://localhost:27020" 2_page_in_cache.js
```

## Query 2, index partially support the query
```
echo "###### Query 2, index partially support the query" ;\
docker rm -fv mongodb_00806068_run > /dev/null ;\
docker run --name mongodb_00806068_run -d --rm -p 27020:27017 --memory="5g" -v $(pwd)/mongod/ftdc:/mongo/data/db/diagnostic.data -v $(pwd)/mongod/logs:/mongo/data/db/logs mongodb_00806068 > /dev/null &&\
sleep 5; mongo --quiet "mongodb://localhost:27020/dbsample" --eval 'db.sample.find({"name":"Boulevard Bistro","address.city":"Onkaczu"}).hint("index_2");' > /dev/null &&\
mongo --quiet "mongodb://localhost:27020" 2_page_in_cache.js
```

## Query 3, index fully support the query
```
echo "###### Query 3, index fully support the query" ;\
docker rm -fv mongodb_00806068_run > /dev/null ;\
docker run --name mongodb_00806068_run -d --rm -p 27020:27017 --memory="5g" -v $(pwd)/mongod/ftdc:/mongo/data/db/diagnostic.data -v $(pwd)/mongod/logs:/mongo/data/db/logs mongodb_00806068 > /dev/null &&\
sleep 5; mongo --quiet "mongodb://localhost:27020/dbsample" --eval 'db.sample.find({"name":"Boulevard Bistro","address.city":"Onkaczu"}).hint("index_1");' > /dev/null &&\
mongo --quiet "mongodb://localhost:27020" 2_page_in_cache.js
```