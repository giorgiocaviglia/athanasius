# helpers
import settings
import json
from bson import ObjectId
from pymongo.errors import InvalidId
from models import *

def get_api_key(request):
    api_key = request.GET.get('api_key') or request.POST.get('api_key')
    if not api_key:        
        return None
    
    return api_key 
    

def get_user_from_api_key(request):
    api_key = get_api_key(request)
    if api_key is None:
        return None
    try:
        user = Key.objects.get(key=api_key).user
    except:
        return None
    return user


def get_mongo_id(object):
    try:
        object = ObjectId(object)
    except InvalidId:
        pass
    return object
    

def get_query(request):
    query = request.GET.get('query') or request.POST.get('query')
    try:
        query = json.loads(query)
    except Exception, e:
        print str(e)
        query = {}
    print query
    return query


def get_session(request):
    session = request.GET.get('session') or request.POST.get('session')
    if type(session) is object:
        return session
    try:
        session = json.loads(session)
    except Exception, e:
        print str(e)
        session = {}
    return session

def get_method(request):
    method = request.GET.get('method') or request.POST.get('method') or request.method
    return method.upper()

def get_limit(request):
    limit = request.GET.get('limit') or request.POST.get('limit') or settings.DEFAULT_LIMIT
    return int(limit)

def get_offset(request):
    offset = request.GET.get('offset') or request.POST.get('offset') or settings.DEFAULT_OFFSET
    return int(offset)

def get_sort(request):
    sort = request.GET.get('sort') or request.POST.get('sort')
    print sort
    try:
        sort = json.loads(sort)
        sort = [ (s.keys()[0],s[s.keys()[0]]) for s in sort]
    except Exception, e:
        print str(e)
        sort = settings.DEFAULT_SORT
    return sort