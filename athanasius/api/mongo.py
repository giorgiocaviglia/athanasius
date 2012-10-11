# mongo wrapper

import datetime
import settings
import pymongo
import json
import bson
import bson.json_util

class Mongo(object):
    """
    This class interacts with Mongo Db instance 
    """
    db = None
    available_commands = ['find_one', 'find', 'count']
    
    def __init__(self, server=None, port=None):
        self.server = server or settings.MONGO_SERVER_HOSTNAME
        self.port = int(port or settings.MONGO_SERVER_PORT)
        self.connection = None
        
    def connect(self):
        self.connection = pymongo.Connection(self.server, self.port)
        
    def get_db(self, db_name):
        db = getattr(self.connection, db_name)
        return db        

    def use_db(self, db_name):
        db = getattr(self.connection, db_name)
        if db:
            self.db = db
        return db 
                
    def get_collection(self, collection_name):
        collection = getattr(self.db, collection_name)
        return collection
        
    def drop_collection(self, db_name, collection_name):
        db = self.get_db(db_name)
        collection = getattr(db, collection_name)
        collection.drop()        
        
    def _insert(self, db_name, collection_name, document):
        collection = self.get_collection(db_name, collection_name)
        return collection.insert(document)
    
    def insert(self, collection_name, document, safe=True):
        collection = self.get_collection(collection_name)
        return collection.insert(document)
    
    def delete(self, collection_name, document_id, safe=False):
        collection = self.get_collection(collection_name)
        return collection.remove(document_id, safe=safe)
    
    def update(self, collection_name, document_id, document, upsert=False):
        collection = self.get_collection(collection_name)
        return collection.update(document_id, document, upsert=upsert)
    
    """
    def insert(self, db_name, collection_name, request):
    
        document = request.GET.get('document') or request.POST.get('document')
        document = self.parseJsonDict(document)       
        return self._insert(db_name, collection_name, document)
    
    
    def find_one(self, db_name, collection_name, request): 
    
        queryDict = request.GET.get('query') or request.POST.get('query')
        queryDict = self.parseJsonDict(queryDict)
        collection = self.getCollection(db_name, collection_name)
        return collection.find_one(queryDict)
    """  
    
    def objects(self, db_name, collection_name, query_dict={}, offset=0, limit=100, formatter_callback=None):
        """
        Performs find on a collection, with offset and limit parameters
        
        Passing None as limit to this function returns all objects.
        The web view should not permit it.
        
        """
        collection = self.get_collection(db_name, collection_name)
        cursor = collection.find(query_dict)
        
        records = []
        counted = 0
        has_more = False
        
        for r in cursor[offset:]:
            if counted < limit or limit is None:
                #TODO: what happens if format_callback fails? Now we skip the record
                if formatter_callback:
                    try:
                        r = formatter_callback(r)
                    except:
                        continue
                records.append(r)
                counted += 1
            else:
                has_more = True
                break
        
        out = {'records' : records, 'has_more' : has_more, 'num_records' : counted }
        return out
    
    
    def find_one(self, db_name, collection_name, query):
        if type(query) is str:
            query = self.parseJsonDict(query)
        collection = self.get_collection(db_name, collection_name)
        cursor = collection.find_one(query)
        return cursor
    
    def find(self, collection_name, query, limit=0, offset=0, sort=[( '_id', 1 )]):
        # parsing the query, in any case...
        query = self.parse_json_dict(query)
        if query is None:
            return None
            
        collection = self.get_collection(collection_name)
        cursor = collection.find(query).skip(offset).limit(limit).sort(sort)        
        result = [c for c in cursor]
        
        return result
    
    def count(self, collection_name, query, limit=0, offset=0, sort=[( '_id', 1 )]):
        collection = self.get_collection(collection_name)
        return collection.find(query).count()
        
    
    """
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
        
        collection = self.get_collection(db_name, collection_name)
        if queryDict:
            return [collection.find(queryDict).count()]

        return [collection.count()]

    """
        
    def parse_json_dict(self, object):
        if type(object) is not str:
            return object       
        try:
            object_dictionary = json.loads(object)
            return dict(object_dictionary)
        except:
            return None
            
            
    