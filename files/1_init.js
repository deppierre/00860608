//Drop index if any
db.getSiblingDB('dbindex').sample.dropIndexes();

//Create a new index on the dbindex.restaurants collection
let index = db.getSiblingDB('dbindex').sample.createIndex({
    "name":1,
    "address.city":1
});
printjson(index);

db.getSiblingDB('admin').shutdownServer();