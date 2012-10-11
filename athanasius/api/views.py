# Create your views here.
import bson, json
import os, chardet, csv
from django.template import Context, loader
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.conf import settings as django_settings

from decorators import *
from helpers import *
from models import Process, Session
from tasks import add, uploadFromFile
from wrappers import *
from parsers import parse_json, parse_uploaded
from bson import ObjectId
from pymongo.errors import InvalidId
import logging
import chardet

import time

@api_key_is_valid
def api_test(request):
    
    user = request.user if request.user.is_authenticated() else get_user_from_api_key(request)
    
    task = uploadFromFile.delay()
    #task = add.delay(12)
    
    Process.objects.create(owner=user, task_id=task.task_id, name=uploadFromFile.name)
    print
    response = createResponse200()
    response['result'] = task.task_id
    
    return HttpResponse(json.dumps(response))





@api_key_is_valid
def api_merge(request):
    
    response = createResponse200()
    
    try:
        session = get_session(request)
        print session
        
        session_id = session['session_id']
        mapper = session['map']
        
        
        if not mapper or not session_id:
            raise Exception("Required parameters missing")
            
        
        
        # creating schema if does not exist
        #TODO: creating a method for this

        if mapper['extended']:
            schema = {}
            schema['_id'] = mapper['_id']
            schema['label'] = mapper['label']
            schema['description'] = mapper['description']
            schema['attributes'] = [ a for a in mapper['map'] ]
            for a in schema['attributes']:
                if 'map' in a:
                    del a['map']
        
            result_schema = create_objects('schemas', schema)
            
            # forget for now
            #if result_schema['status'] != '200':
            #    raise Exception("mmmm")
        
        
        query = { '_id': ObjectId(session_id) }
        
        result = read_objects('sessions', query)
        if result['status'] != '200':
            raise Exception("No data found")
        
        objects = []
        for d in result['result']['objects'][0]['data']:
            
            
            #TODO: controllare se collezione esiste...
            obj = {}
            obj['schema'] = mapper['_id']
            obj['collection'] = mapper['collection']
            obj['created_at'] = time.time()
            obj['attributes'] = []
            obj['_id'] = ObjectId()
            # adding the session id for mapping...
            obj['session'] = ObjectId(session_id)
                        
            for b in mapper['map']:
                
                attribute = {}
                attribute['key'] = b['key']
                
                if 'map' in b:
                    attribute['value'] = d[b['map']['label']]
                else:
                    attribute['value'] = ""
                
                obj['attributes'].append(attribute)
            objects.append(obj)    
        
        print len(objects)
        
        created_objects = create_objects('items',objects)
        
        response['result'] = created_objects
        
        """
        print
        print "==============================="
        print " Look up for similarity..."
        print "==============================="
        
        response['similar'] = similar('mrofl:Person', { 'mrofl:Literal/mrofl:FullName' : 1, 'mrofl:Date/mrofl:BirthDate' : .5, 'mrofl:Date/mrofl:DeathDate' : .5  }, objects, threshold=0.8)
        
        created_objects = []
        for object in objects:
            result = mongo.insert(database, 'objects', object)
            created_objects.append(result)
        
        response['results'] = {}
        response['results']['session'] = str(tmp_id)
        response['results']['count'] = len(objects)
        
        
    except Exception, e:
        response['errors'] = str(e)
        response['status'] = 0
    """
    
    except Exception, e:
        response=createResponse401(str(e))
         
    return HttpResponse(json.dumps(response, default=bson.json_util.default))


def api_map_items(items, mapper):
    
    # prende oggetti e li mappa usando un mapper
    # la question e capire sul tmp
    
    return
    
    
@api_key_is_valid
def api_upload(request):
        
    response = createResponse200()
    
    for f in request.FILES.getlist('files[]'):
        
        try:
        
            with open(os.path.join(django_settings.BASE_PATH, 'tmp/tmp.txt'), 'wb+') as destination:
                os.chmod(os.path.join(django_settings.BASE_PATH, 'tmp/tmp.txt'), 0777)
                for chunk in f.chunks():
                    destination.write(chunk)
            
            
            lines = []
            for line in open(os.path.join(django_settings.BASE_PATH, 'tmp/tmp.txt'), 'r'):                
                lines.append(line)
            
             
            encoding = chardet.detect(lines[0])
            encoding = encoding['encoding']
            
            new_lines = []
            
            for line in lines:
                new_line = line.decode(encoding).encode('utf-8')
                new_lines.append(new_line)
            
            header = new_lines[0].split("\t")
            
            #rows = csv.DictReader(f, delimiter='\t')
            
            
            #result = []
            #for row in rows:
            #    result.append(row)
            
            
            """
            f.open()
            sniffer = csv.Sniffer()
            dialect = sniffer.sniff(f.read())
            dialect.delimiter = "\t"
            """
            response['result']['problema'] = header
        
        except Exception, e:
            response = createResponse401(str(e))
            
        """
        try:
            
            if f.size == 0:
                raise Exception("File is empty")
        
            results = parse_uploaded(f)

            session = {}
            session['data'] = results
            created = create_objects('sessions', session)

            # returning just the first one...
            response['result']['session_id'] = str(created['result']['objects'][0])
            response['result']['header'] = results[0].keys()
            response['result']['count'] = len(results)
        
        except Exception, e:
            response = createResponse401(str(e))     
        """
    return HttpResponse(json.dumps(response, default=bson.json_util.default))



@api_key_is_valid
def api_items(request, item_id=None):
    
    user = request.user if request.user.is_authenticated() else get_user_from_api_key(request)
    
    if user is None:
        return HttpResponse(json.dumps(createResponse401('You need to be logged in or provide a valid api_key')))

    method = get_method(request)
    limit = get_limit(request)
    offset = get_offset(request)
    sort = get_sort(request)
    query = get_query(request)
    
    if method == "GET":
        if item_id:
            try:
                query = { '_id' : ObjectId(item_id) }
            except InvalidId:
                query = { '_id' : item_id }
        response = read_objects('items', query, limit=limit, offset=offset, sort=sort)
    
    
    if method == "POST":
        if item_id:
            response = createResponse401('Error. Item already existing. Consider to use UPDATE')
        else:
            #TODO: capire come chiamare gli oggetti nuovi...
            #TODO: creare oggetto Django! AthanasiusCollection
            response = create_objects('items', query, limit=limit, offset=offset, sort=sort)


    if method == "DELETE":
        if item_id:
            try:
                query = { '_id' : ObjectId(item_id) }
            except InvalidId:
                query = { '_id' : item_id }
        response = delete_objects('items', query, limit=limit, offset=offset, sort=sort)
    
    if method == "UPDATE":
        response = update_objects('items', query, limit=limit, offset=offset, sort=sort)

    return HttpResponse(json.dumps(response, default=bson.json_util.default))



@api_key_is_valid
def api_schemas(request, schema_id=None):
    
    user = request.user if request.user.is_authenticated() else get_user_from_api_key(request)
    
    if user is None:
        return HttpResponse(json.dumps(createResponse401('You need to be logged in or provide a valid api_key')))

    method = get_method(request)
    limit = get_limit(request)
    offset = get_offset(request)
    sort = get_sort(request)
    query = get_query(request)
    
    if method == "GET":
        if schema_id:
            try:
                query = { '_id' : ObjectId(schema_id) }
            except InvalidId:
                query = { '_id' : schema_id }
        response = read_objects('schemas', query, limit=limit, offset=offset, sort=sort)
            
            
    if method == "POST":
        if schema_id:
            response = createResponse401('Error. Item already existing. Consider to use UPDATE')
        else:
            #TODO: capire come chiamare gli oggetti nuovi...
            #TODO: creare oggetto Django! AthanasiusCollection
            response = create_objects('schemas', query, limit=limit, offset=offset, sort=sort)


    if method == "DELETE":
        response = delete_objects('schemas', query, limit=limit, offset=offset, sort=sort)

    if method == "UPDATE":
        response = update_objects('schemas', query, limit=limit, offset=offset, sort=sort)
        
    return HttpResponse(json.dumps(response, default=bson.json_util.default))


@api_key_is_valid
def api_collections(request, collection_id=None):
    
    user = request.user if request.user.is_authenticated() else get_user_from_api_key(request)
    
    if user is None:
        return HttpResponse(json.dumps(createResponse401('You need to be logged in or provide a valid api_key')))

    method = get_method(request)
    limit = get_limit(request)
    offset = get_offset(request)
    sort = get_sort(request)
    query = get_query(request)
    

    if method == "GET":        
        if collection_id:
            try:
                query = { '_id' : ObjectId(schema_id) }
            except InvalidId:
                query = { '_id' : schema_id }
            
            response = read_objects('collections', query, limit=limit, offset=offset, sort=sort)
            if response['status'] == '200' and response['result']['count'] == 0:
                response = createResponse401('Collection %s does not exist' % collection_id)
        else:        
            response = read_objects('collections', query, limit=limit, offset=offset, sort=sort)
    
    
    if method == "POST":
        if collection_id:
            response = createResponse401('Error. Collection already existing. Consider to use UPDATE')
        else:
            #TODO: capire come chiamare gli oggetti nuovi...
            #TODO: creare oggetto Django! AthanasiusCollection
            response = create_objects('collections', query, limit=limit, offset=offset, sort=sort)


    if method == "DELETE":
        response = delete_objects('collections', query, limit=limit, offset=offset, sort=sort)
    
    if method == "UPDATE":
        response = update_objects('collections', query, limit=limit, offset=offset, sort=sort)
        
    return HttpResponse(json.dumps(response, default=bson.json_util.default))



def api_tasks(request):
    
    # checking if current user has open tasks
    tasks = Process.objects.get(owner=request.user)

    return HttpResponse(user)


@api_key_is_valid
def api_scratch(request):
    
    response = createResponse200()
    response['result'] = []
    
    try:
        # mrofl schema
        mrofl_schema_file = os.path.join(getattr(django_settings, 'BASE_PATH'), 'scratch/mrofl.schema.js')
        mrofl_schema = parse_json(mrofl_schema_file)
        create_objects('schemas', mrofl_schema)
        
        
        # mrofl collection
        mrofl_collection_file = os.path.join(getattr(django_settings, 'BASE_PATH'), 'scratch/mrofl.collection.js')
        mrofl_collection = parse_json(mrofl_collection_file)
        print mrofl_collection
        create_objects('collections', mrofl_collection)
    
    except Exception, e:
        response = createResponse401(str(e))    
    
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")
    
    
def fake_import(request):
    
    dir = os.path.dirname(os.path.abspath(__file__))
    filepath = os.path.join(dir, 'test.txt')
    f = open(filepath,"r")
    
    csv.field_size_limit(1000000000)
    
    # getting file encoding
    result = chardet.detect(f.read())
    encoding = result['encoding']
            
    # determing dialect
    f.seek(0)
    sniffer = csv.Sniffer()
    dialect = sniffer.sniff(f.read())
    dialect.delimiter = "\t"

    # encoding file
    f.seek(0)
    utf8_file = f.read().decode(encoding).encode('utf-8')
    reader = csv.DictReader( utf8_file.splitlines(), dialect=csv.excel_tab )
    rows = list(reader)
    
    # get results
    results = []
    
    for i, row in enumerate(rows):
        results.append(row)
    
    response = create_objects('items', results)

    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")
