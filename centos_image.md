## Building the image
```
docker build -f centos_dockerfile -t mongodb_00806068_2 .
```

## Read catalog
```
docker rm -fv mongodb_00806068_2_run > /dev/null ; rm -f mongod/{ftdc,logs}/* ;\
docker run --name mongodb_00806068_2_run -d --rm --privileged -p 27020:27017 --memory="5g" -v $(pwd)/mongod/ftdc:/mongo/data/db/diagnostic.data -v $(pwd)/mongod/logs:/mongo/data/db/logs mongodb_00806068_2 > /dev/null &&\
docker exec -ti mongodb_00806068_2 ls
```