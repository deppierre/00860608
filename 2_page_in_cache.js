/*
Units:
- Size in mb
- Cached in mb
- Read in mb
- Written in mb
- Used in pages
*/

dbNames = ["dbsample"]
collections = ["sample"]

print( "Namespace                                                           \tSize\tCached\tRead\tPagesRead")

for(d=0;d<dbNames.length;d++){
    for(c=0;c<collections.length;c++) {
        db = db.getSiblingDB(dbNames[d])
        mb = 1024*1024
        collStats = db.getCollection(collections[c]).stats({scale: mb, indexDetails: true})

        inCache = Math.round(collStats["wiredTiger"]["cache"]["bytes currently in the cache"] /mb * 100) / 100
        cacheRead = Math.round(collStats["wiredTiger"]["cache"]["bytes read into cache"] /mb * 100) / 100
        pagesUsed = Math.round(collStats["wiredTiger"]["cache"]["pages read into cache"])
        collSize = collStats["size"] + collStats['totalIndexSize']
        namespace = dbNames[d] + "." + collections[c]
        lgth = namespace.length<=70?namespace.length:70
        namespace = namespace + Array(70 - lgth).join(" ")

        if(collSize > 0) {
            print(  namespace + "\t" + collSize + "\t" +  inCache + "\t" + cacheRead + "\t" + pagesUsed )
        }

        // print index stats
        indexInfo = db.getCollection(collections[c]).getIndexes();

        for(i=0;i<indexInfo.length;i++){
            nameIndex = indexInfo[i].name

            indexStats = collStats.indexDetails[nameIndex]
            indexInCache = Math.round(indexStats["cache"]["bytes currently in the cache"] /mb * 100) / 100
            indexCacheRead = Math.round(indexStats["cache"]["bytes read into cache"] /mb * 100) / 100
            indexPagesUsed = Math.round(indexStats["cache"]["pages read into cache"])
            indexSize = collStats.indexSizes[nameIndex]
            nameTab =Array(10).join(" ") + nameIndex + Array(Math.max(0,60 - nameIndex.length)).join(" ")
            if(indexSize > 0) {
                print( nameTab + "\t" + indexSize + "\t" +  indexInCache + "\t" + indexCacheRead + "\t"+ indexPagesUsed )
            }
        }
    }
}