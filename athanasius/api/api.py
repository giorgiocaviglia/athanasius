from mongowrapper import MongoWrapper
from helpers import *
import settings
from bson.code import Code
from scripts import initScripts

def testDB(request):
    """
    A simple test connection
    """
    
    response = createBaseResponseObject()
    response['meta']['user'] = str(request.user)
    
    database = settings.MONGO_SERVER_DEFAULT_DB
    mongo = MongoWrapper()

    try:
        mongo.connect()
        response['results'] = ['Yeah! Connection successfully established with the DB.']
    
    except Exception, e:
        response['errors'] = str(e)
        response['status'] = 0
    
    return response


# ==== /meta ====
def getMeta(request):
    """
    Some information about the db
    """
    
    response = createBaseResponseObject()
    response['meta']['user'] = str(request.user)
    
    database = settings.MONGO_SERVER_DEFAULT_DB
    collection = 'letter'
    
    offset = getOffset(request)
    limit = getLimit(request)
    
    
    try:
    
        query_dict = {} #{'PrimaryName':{'$regex' : query, '$options': 'i'}}
    
        mongo = MongoWrapper()
        mongo.connect()
    
        existing_dbs = mongo.connection.database_names()
        if database not in existing_dbs:
            raise Exception("Database %s does not exist" % database)
            
        database_object = mongo.getDb(database)
        existing_collections = database_object.collection_names()
        if collection not in existing_collections:
            raise Exception("Collection %s does not exist" % collection)
       
       
        # let's init the scripts...
        initScripts(database_object)
        variety = mongo.functionWrapper(database, 'variety')

        query_result = variety(collection)

   #     response['count'] = query_result['count']
        response['results'] = query_result#['records']
        response['request'] = request.get_full_path()
    
    except Exception, e:
        response['errors'] = repr(e)
        response['status'] = 0
    
    try:
        mongo.connection.close()
    except:
        pass
    
    return response
    


# ==== /suggest ====

def getSuggest(request):
    
    # TODO: automatic retrieve of fields
    fields = getFields(request)
    
    query = request.GET.get('s') or request.POST.get('s')
    
    response = createBaseResponseObject()
    response['meta']['user'] = str(request.user)

    database = settings.MONGO_SERVER_DEFAULT_DB
    collection = 'm_person'
    
    offset = getOffset(request)
    limit = getLimit(request)
        
    
    try:
        
        if query == None:
            raise Exception("You need to specify a query")
    
        #query_dict = {'PrimaryName':{'$regex' : query, '$options': 'i'}}
        
        mongo = MongoWrapper()
            
        mongo.connect()
        
        existing_dbs = mongo.connection.database_names()
        if database not in existing_dbs:
            raise Exception("Database %s does not exist" % database)
            
        database_object = mongo.getDb(database)
        existing_collections = database_object.collection_names()
        if collection not in existing_collections:
            raise Exception("Collection %s does not exist" % collection)
        
        for field in fields:
            
            query_dict = { field : {'$regex' : query, '$options': 'i'} } 
        
            """
            query_dict = {}
        
            for field in available_fields:
                query_field = {
                    field : {'$regex' : query, '$options': 'i'}
                }
                if not '$or' in query_dict:
                    query_dict['$or'] = []
                query_dict['$or'].append(query_field)
            """
        
            query_result = mongo.keys(database, collection, field, query_dict=query_dict )
            
            for f in query_result['results']:
                f['field'] = field
                response['results'].append(f)
                    
        response['request'] = request.get_full_path()
    
    except Exception, e:
        response['errors'] = str(e)
        response['status'] = 0
    
    try:
        mongo.connection.close()
    except:
        pass
        
    return response


    

# ==== /search ====

def getSearch(request):
    
    
    query = request.GET.get('s') or request.POST.get('s')
    
    response = createBaseResponseObject()
    response['meta']['user'] = str(request.user)

    database = settings.MONGO_SERVER_DEFAULT_DB
    collection = 'm_person'
    
    offset = getOffset(request)
    limit = getLimit(request)
    
    fields = getFields(request)
    case_sensitive = getCaseSensitive(request)
    
    try:
        
        if query == None:
            raise Exception("You need to specify a query")
    
        query_dict = {}
        
        for field in fields:
            
            if not case_sensitive:
                query_field = { field : {'$regex' : query, '$options': 'i'} }
            else:
                query_field = { field : query }
                
            if not '$or' in query_dict:
                query_dict['$or'] = []
            
            query_dict['$or'].append(query_field)
        
        print fields
        print query_dict
        
        mongo = MongoWrapper()
            
        mongo.connect()
    
        existing_dbs = mongo.connection.database_names()
        if database not in existing_dbs:
            raise Exception("Database %s does not exist" % database)
            
        database_object = mongo.getDb(database)
        existing_collections = database_object.collection_names()
        if collection not in existing_collections:
            raise Exception("Collection %s does not exist" % collection)
       
        query_result = mongo.objects(database, collection, query_dict=query_dict, limit=10000, offset=offset )

        response['count'] = query_result['count']
        response['results'] = query_result['records']
        response['request'] = request.get_full_path()
    
    except Exception, e:
        response['errors'] = str(e)
        response['status'] = 0
    
    try:
        mongo.connection.close()
    except:
        pass
        
    return response


# ==== /persons ====

def getPersons(request):
    
    query_dict = getQueryDict(request)
    offset = getOffset(request)
    limit = getLimit(request)
    
    response = getObjects('m_person', query_dict, offset, limit)
    return response


def getPerson(request, person_id):

    query_dict = { '_id' : {'$regex':getObjectId(person_id)} }
    offset = getOffset(request)
    limit = getLimit(request)
    
    response = getObjects('m_person', query_dict, offset, limit)
    if response['status'] == "1" and response['count'] == 0:
        response['status'] = 0
        response['errors'].append('This person does not exist in our archive')
    return response


def getPersonCorrespondents(request, person_id):
    
    offset = getOffset(request)
    limit = getLimit(request)
        
    response = createBaseResponseObject()
    database = settings.MONGO_SERVER_DEFAULT_DB
    collection = 'letter'
    mongo = MongoWrapper()
    
    try:
        
        mongo.connect()
    
        existing_dbs = mongo.connection.database_names()
        if database not in existing_dbs:
            raise Exception("Database %s does not exist" % database)
            
        database_object = mongo.getDb(database)
        existing_collections = database_object.collection_names()
        if collection not in existing_collections:
            raise Exception("Collection %s does not exist" % collection)
        
        correspondents = {}
        
        # TODO: filtering author/recipients...
        
        # getting all the recipients when author is our guy
        query_dict = {'MAuthor': {'$elemMatch' : {'$id': { '$regex' : getObjectId(person_id) } } } }
        query_result = mongo.groupBy(database, collection, 'MRecipient', query_dict=query_dict)
        for c in query_result['results']:
            correspondents[c['_id']] = {}
            correspondents[c['_id']]['letters_received'] = c['value']
                
        # getting all the authors when recipient is our guy
        query_dict = {'MRecipient': {'$elemMatch' : {'$id': { '$regex' : getObjectId(person_id) } } } }
        query_result = mongo.groupBy(database, collection, 'MAuthor', query_dict=query_dict)
        for c in query_result['results']:
            if not c['_id'] in correspondents:
                correspondents[c['_id']] = {}
            correspondents[c['_id']]['letters_sent'] = c['value']
                
        # get information about all the recipients
        collection = 'm_person'
        query_dict = {'_id' : {'$in': correspondents.keys() }}
        query_result = mongo.objects(database, collection, query_dict=query_dict,limit=10000)
        for c in query_result['records']:
            print c['_id']
            correspondents[c['_id']]['data'] = c
        
        response['count'] = query_result['count']
        response['results'] = correspondents
        
    
    except Exception, e:
        response['errors'] = str(e)
        response['status'] = 0
    
    try:
        mongo.connection.close()
    except:
        pass
        
    return response



def getPersonLetters(request, person_id):
    
    query_dict = {'$or' : [
        {'MAuthor': {'$elemMatch' : {'$id': { '$regex' : getObjectId(person_id) } } } },
        {'MRecipient': {'$elemMatch' : {'$id': { '$regex' : getObjectId(person_id) } } } }
    ]}
    
    offset = getOffset(request)
    limit = getLimit(request)
        
    response = createBaseResponseObject()
    database = settings.MONGO_SERVER_DEFAULT_DB
    collection = 'letter'
    mongo = MongoWrapper()
    
    try:
        
        mongo.connect()
    
        existing_dbs = mongo.connection.database_names()
        if database not in existing_dbs:
            raise Exception("Database %s does not exist" % database)
            
        database_object = mongo.getDb(database)
        existing_collections = database_object.collection_names()
        if collection not in existing_collections:
            raise Exception("Collection %s does not exist" % collection)
       
        query_result = mongo.objects(database, collection, query_dict=query_dict, limit=limit, offset=offset )

        response['count'] = query_result['count']
        response['results'] = query_result['records']
        
    
    except Exception, e:
        response['errors'] = str(e)
        response['status'] = 0
    
    try:
        mongo.connection.close()
    except:
        pass
        
    return response
    


# ==== Generic ====

def getObjects(collection, query_dict, offset, limit):
    """ Generic request """
    
    out = createBaseResponseObject()
    database = settings.MONGO_SERVER_DEFAULT_DB
    
    mongo = MongoWrapper()
    
    try:
        
        mongo.connect()
    
        existing_dbs = mongo.connection.database_names()
        if database not in existing_dbs:
            raise Exception("Database %s does not exist" % database)
            
        database_object = mongo.getDb(database)
        existing_collections = database_object.collection_names()
        if collection not in existing_collections:
            raise Exception("Collection %s does not exist" % collection)
            
        query_result = mongo.objects(database, collection, query_dict=query_dict, offset=offset, limit=limit)
        
        records = query_result['records']
        has_more = query_result['has_more']
        count = query_result['count']
        out['results'] = records
        out['has_more'] = has_more
        out['count'] = count
    
    except Exception, e:
        out['errors'] = str(e)
        out['status'] = 0
    
    try:
        mongo.connection.close()
    except:
        pass
        
    return out
