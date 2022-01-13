//Drop index if any
db.getSiblingDB('dbindex').restaurants.dropIndexes();

//Create a new index on the dbindex.restaurants collection
let index_restaurants = db.getSiblingDB('dbindex').restaurants.createIndex({
    "name":1,
    "address.city":1
});
printjson(index_restaurants);


//Create a new index on the nodbindex.restaurants collection
let noindex_restaurants = db.getSiblingDB('dbnoindex').restaurants.createIndex({
    "name":1
});
printjson(noindex_restaurants);

db.getSiblingDB('admin').shutdownServer();