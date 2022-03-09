## Building the image
```
docker build -t mongodb_00806068 .
```

## Command to run the container with 500mb memory (WT cache size * 2)
```
docker rm -fv mongodb_00806068_run; rm -f mongod/{ftdc,logs}/* ;\
docker run --name mongodb_00806068_run -d --rm -p 27020:27017 --memory="5g" -v $(pwd)/mongod/ftdc:/mongo/data/db/diagnostic.data -v $(pwd)/mongod/logs:/mongo/data/db/logs mongodb_00806068 &&\
docker exec -ti mongodb_00806068_run ls
```

## Read catalog
```
docker exec -ti mongodb_00806068_run ./mdb_catalog .
```

## Query
```
mongo --quiet "mongodb://localhost:27020" 2_page_in_cache.js &&\
sleep 5; echo "## Query supported by an index"; mongo --quiet "mongodb://localhost:27020/dbindex" --eval 'db.sample.find({"name": "Boulevard Bistro","address.city":"Onkaczu"});' &&\
sleep 5; echo "## Query NOT supported by an index"; mongo --quiet "mongodb://localhost:27020/dbnoindex" --eval 'db.sample.find({"name": "Boulevard Bistro","address.city":"Onkaczu"});' &&\
mongo --quiet "mongodb://localhost:27020" 2_page_in_cache.js &&\
sleep 5; docker exec mongodb_00806068_run mongo --quiet "mongodb://localhost:27017/admin" --eval 'db.shutdownServer();'
```