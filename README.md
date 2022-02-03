## Building the image
```
docker build -t mongodb_80608 .
```

## Command to run the container with 500mb memory (WT cache size * 2)
```
docker rm -fv mongodb_80608_run; rm -f mongod/{ftdc,logs}/* ;\
docker run --name mongodb_80608_run -d --rm -p 27020:27017 --memory="5g" -v $(pwd)/mongod/ftdc:/mongo/data/db/diagnostic.data -v $(pwd)/mongod/logs:/mongo/data/db/logs mongodb_80608 &&\
sleep 5; mongo --quiet "mongodb://localhost:27020" 2_page_in_cache.js
```

## Queries:
1. query 1
```
mongo --quiet "mongodb://localhost:27020/dbindex" --eval 'db.restaurants.find({"name": "Boulevard Bistro","address.city":"Onkaczu"});' &&\
sleep 5; mongo --quiet "mongodb://localhost:27020/dbnoindex" --eval 'db.restaurants.find({"name": "Boulevard Bistro","address.city":"Onkaczu"});' &&\
mongo --quiet "mongodb://localhost:27020" 2_page_in_cache.js
```
2. query 2
```
mongo --quiet "mongodb://localhost:27020/dbindex" --eval 'db.restaurants.find({"name": "The French Room","address.city":"Tesazhu"});' &&\
mongo --quiet "mongodb://localhost:27020/dbnoindex" --eval 'db.restaurants.find({"name": "The French Room","address.city":"Tesazhu"});' &&\
mongo --quiet "mongodb://localhost:27020" 2_page_in_cache.js
```