import datetime
import settings
import pymongo
import string
import json
import bson
import bson.json_util
from bson.code import Code

class MongoWrapper(object):
    """
    This class interacts with Mongo Db instance 
    """
    
    available_commands = ['find_one', 'find', 'count', 'eval']
    
    def __init__(self, server=None, port=None):
        self.server = server or settings.MONGO_SERVER_HOSTNAME
        self.port = int(port or settings.MONGO_SERVER_PORT)
        self.connection = None
        
    def connect(self):
    
        self.connection = pymongo.Connection(self.server, self.port)
        
        
    def getDb(self, db_name):
    
        db = getattr(self.connection, db_name)
        return db
        
                
    def getCollection(self, db_name, collection_name):
    
        db = self.getDb(db_name)
        collection = getattr(db, collection_name)
        return collection
        
        
    def _insert(self, db_name, collection_name, document):
    
        collection = self.getCollection(db_name, collection_name)
        return collection.insert(document)    
      
    
    def insert(self, db_name, collection_name, request):
    
        document = request.GET.get('document') or request.POST.get('document')
        document = self.parseJsonDict(document)       
        return self._insert(db_name, collection_name, document)
    
   
    def eval(self, db_name, code, args):
    
        db = self.getDb(db_name)
        var1 = 1
        var2 = 2
        result = db.eval(Code('add(a, b)', {'a': var1, 'b': var2,}))
        return result
  
      
    def find_one(self, db_name, collection_name, request): 
    
        queryDict = request.GET.get('query') or request.POST.get('query')
        queryDict = self.parseJsonDict(queryDict)
        collection = self.getCollection(db_name, collection_name)
        return collection.find_one(queryDict)
        
    
    def map_reduce(self, db_name, collection_name, mapper, reducer, query_dict={}):
        collection = self.getCollection(db_name, collection_name)
        result = collection.map_reduce(mapper, reducer, out={ "inline" : 1 }, query=query_dict)
        return result
        
    
    def groupBy(self, db_name, collection_name, field, query_dict={}):
        """ Groups the elements of a collection on a specific field """
        
        collection = self.getCollection(db_name, collection_name)
        
        mapper = Code("""
                    function() {
                        if (this.hasOwnProperty(field)){
                            var values = typeof this[field] == 'string' ? [this[field]] : this[field];
                            values.forEach(function(z){
                                emit(z.$id, 1);
                            });
                        }
                    }
                    """, {'field':field})
        
        reducer = Code("""
                    function(key,values) {
                    var total = 0
                    for (var i=0; i < values.length; i++){
                        total += values[i];
                    }
                    return total;
                    }
                    """)
                
        result = collection.map_reduce(mapper, reducer, out={ "inline" : 1 }, query=query_dict)
        return result        
    
    
    def objects(self, db_name, collection_name, query_dict={}, offset=0, limit=100, formatter=None):
        collection = self.getCollection(db_name, collection_name)
        cursor = collection.find(query_dict)
        count = cursor.count()
        
        #TODO: handle offset
        #TODO: handle formatter

        records = []
        counted = 0
        has_more = False
        
        for r in cursor:
            if counted < limit:
                records.append(r)
                counted += 1
            else:
                has_more = True
                break
        
        out = {'records' : records, 'has_more' : has_more, 'count' : count }
        return out
    
    
    def keys(self, db_name, collection_name, field, query_dict={}):
        collection = self.getCollection(db_name, collection_name)
        
        mapper = Code("""
                    function() {
                        emit(this[field],1);
                    }
                    """, {'field':field})
        
        
        reducer = Code("""
                    function(key,values) {
                    var total = 0
                    for (var i=0; i < values.length; i++){
                        total += values[i];
                    }
                    return total;
                    }
                    """)
                
        result = collection.map_reduce(mapper, reducer, out={ "inline" : 1 }, query=query_dict)
        return result
    
    
    def find(self, db_name, collection_name, request): 
        
        queryDict = request.GET.get('query') or request.POST.get('query')
        queryDict = self.parseJsonDict(queryDict)

        collection = self.getCollection(db_name, collection_name)
        cursor = collection.find(queryDict)

        out = []
        for r in cursor:
            out.append(r)
        return out
        
        
    def count(self, db_name, collection_name, request): 
        
        queryDict = request.GET.get('query') or request.POST.get('query')
        queryDict = self.parseJsonDict(queryDict)
        
        collection = self.getCollection(db_name, collection_name)
        if queryDict:
            return [collection.find(queryDict).count()]

        return [collection.count()]
        
        
    def parseJsonDict(self, jsonString):
        #TODO: handle a list of dicts        
        try:
            obj = json.loads(jsonString)
            return dict(obj)
        except:
            return {}
    
    def functionWrapper(self, db_name, func):
        '''Returns a closure for calling a server-side function.'''
        params = [] # To keep params ordered
        kwargs = {}
        
        def server_side_func(*args):
            '''Calls server side function with positional arguments.'''
            # Could be removed with better param generating logic
            if len(args) > len(string.letters):
                raise TypeError('%s() takes at most %d arguments (%d given)' % (func, len(string.letters), len(args)))
 
            # Prepare arguments
            for k, v in zip(string.letters, args):
                kwargs[k] = v
                params.append(k) 
 
            # Prepare code object
            code = Code('%s(%s)' % (func, ', '.join(params)), kwargs)
 
            # Return result of server-side function
            return self.getDb(db_name).eval(code)
        
        return server_side_func
