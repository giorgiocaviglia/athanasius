import json
import settings

def createBaseResponseObject():
    """
    Creates a dict used as a request in json responses.
    Status is set to 1 (success)
    """

    out = dict()
    out['status'] = '1'
    out['request'] = ""
    out['results'] = []
    out['errors'] = []
    out['meta'] = {}

    return out

def createResponseObjectWithError(error):
    """
    Creates a dict used as a request in json responses,
    with an error in it and status set to 0 (failure)
    """

    out = dict()
    out['status'] = '0'
    out['request'] = ""
    out['results'] = []
    out['errors'] = [error]
    out['meta'] = {}

    return out

# obj can be: a string, an object
def getObjectId(obj):
    
    try:
        id = obj['_id'].split('[OBID]')[1]
    except:
        try:
            id = obj.split('[OBID]')[1]
        except:
            id = obj
    return id
            
    
def getQueryDict(request, var_name='query'):
    #TODO: handle a list of dicts       
    queryDict = request.GET.get(var_name) or request.POST.get(var_name)
    try:
        obj = json.loads(queryDict)
        return dict(obj)
    except:
        return {}


def getLimit(request, var_name='limit'):
    limit = request.GET.get(var_name) or request.POST.get(var_name)
    try:
        obj = int(limit)
        return max(obj, settings.DEFAULT_QUERY_LIMIT)
    except:
        return settings.DEFAULT_QUERY_LIMIT    


def getOffset(request, var_name='offset'): 
    offset = request.GET.get(var_name) or request.POST.get(var_name)
    try:
        obj = int(limit)
        return obj
    except:
        return 0


def getFields(request, var_name='fields'):
    fields = request.GET.get(var_name) or request.POST.get(var_name)
    try:
        obj = json.loads(fields)
        return obj
    except:
        return settings.DEFAULT_SUGGESTED_FIELDS


def getCaseSensitive(request, var_name='case_sensitive'):
    case_sensitive = request.GET.get(var_name) or request.POST.get(var_name)
    try:
        obj = json.loads(case_sensitive)
        return obj
    except:
        return settings.DEFAULT_CASE_SENSITIVE


def getAuth(request):
    username = request.GET.get("username") or request.POST.get("username")
    password = request.GET.get("password") or request.POST.get("password")
    
    return { 'username' : username, 'password' : password }
    


def getFormatter(self, var_name='formatter'):
    formatter = request.GET.get(var_name) or request.POST.get(var_name)
    return formatter
    
