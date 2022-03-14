//Drop index if any
db.getSiblingDB('dbsample').sample.dropIndexes();

//Create a new index on the dbsample.restaurants collection
let index = db.getSiblingDB('dbsample').sample.createIndex({
    "name":1,
    "address.city":1
},
    {name: "index_1"}
);
printjson(index);

//Create a 2nd index on the dbsample.restaurants collection
let index2 = db.getSiblingDB('dbsample').sample.createIndex({
    "name":1,
},
    {name: "index_2"}
);
printjson(index2);

db.getSiblingDB('admin').shutdownServer();