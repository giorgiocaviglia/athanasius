# api
import settings
from mongo import Mongo
from responses import *
from helpers import *

# default db
database_name = settings.MONGO_SERVER_DEFAULT_DB

#   A generic CREATE (POST) method for Mongo
def create_objects(collection_name, objects, limit=None, offset=None, *args, **kwargs):

    try:
        response = createResponse200()
        
        mongo = Mongo()
        mongo.connect()
        database = mongo.use_db(database_name)
        
        if type(objects) is not list:
            objects = [objects]
            
        # Checking if any of the object already exist by _id
        objects_id = [ object.get('_id', None) for object in objects ]
        query = {'_id' : {'$in' : objects_id }}
        existing = mongo.find(collection_name, query)
        existing_ids = [ e.get('_id') for e in existing ]

        if existing:
            raise Exception("Some objects already exist in '%s' (same _id). Trying using UPDATE method. No objects created." % collection_name)
        
        # no limits or offset so far
        created = mongo.insert(collection_name, objects)
        response['result']['objects'] = created
        response['result']['count'] = len(created)        

        response['result']['limit'] = limit
        response['result']['offset'] = offset
                
    except Exception, e:
        response = createResponse401(str(e))
        
    return response
    


#   A generic READ (GET) method for Mongo
def read_objects(collection_name, query={}, limit=0, offset=0, sort=settings.DEFAULT_SORT, *args, **kwargs):
    
    try:
        response = createResponse200()
        
        mongo = Mongo()
        mongo.connect()
        database = mongo.use_db(database_name)
            
        count = mongo.count(collection_name, query, limit=0, offset=0, sort=sort)
        found = mongo.find(collection_name, query, limit=limit, offset=offset, sort=sort)
        
        response['result']['total'] = count
        response['result']['has_more'] = True if limit + offset < count else False
        response['result']['objects'] = found
        response['result']['count'] = len(found)
        response['result']['limit'] = limit
        response['result']['offset'] = offset
        
        
    except Exception, e:
        response = createResponse401(str(e))
        
    return response
    

#   A generic UPDATE (PUT) method for Mongo
def update_objects(collection_name, objects=None, limit=0, offset=0, *args, **kwargs):

    try:
        response = createResponse200()
        
        mongo = Mongo()
        mongo.connect()
        database = mongo.use_db(database_name)
        
        updated = []
        
        if type(objects) is not list:
            objects = [objects]
        
        for object in objects:
            object_id = { '_id' : object.get('_id') }
            up = mongo.update(collection_name, object_id, object)
            updated.append(up)
        
        response['result']['objects'] = updated
        response['result']['count'] = len(updated)
        response['result']['limit'] = limit
        response['result']['offset'] = offset
        
        
    except Exception, e:
        response = createResponse401(str(e))
        
    return response
    

#   A generic DELETE (DELETE) method for Mongo
def delete_objects(collection_name, objects=None, limit=0, offset=0, *args, **kwargs):
    
    try:
        response = createResponse200()
        
        mongo = Mongo()
        mongo.connect()
        database = mongo.use_db(database_name)
        
        if type(objects) is not list:
            objects = [objects]
            
        deleted = []
        
        for object in objects:

            if isinstance(object, basestring):
                object = { '_id' : get_mongo_id(object) }
                
            d = mongo.delete(collection_name, object, safe=True)
            if d.get('n') == 1:
                deleted.append(object.get('_id'))
            
            if type(object) is None:
                deleted = "All the items have been deleted"
                
        response['result']['deleted_objects'] = deleted
        response['result']['count'] = len(deleted)
        response['result']['limit'] = limit
        response['result']['offset'] = offset
        
        
    except Exception, e:
        response = createResponse401(str(e))
        
    return response
    