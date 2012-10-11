# Athanasius decorators
from django.http import HttpResponse
from django.utils.functional import wraps
from models import Key
from responses import *
from helpers import *
import json


def api_key_is_valid(view):
    
    @wraps(view)
    def inner_decorator(request, *args, **kwargs):
        
        api_key = get_api_key(request)

        # if not api, let's try to see if user has a valid key
        if api_key is None and request.user.is_authenticated():
            try:
                api_key = Key.objects.get(user=request.user)
                if api_key:
                    return view(request, *args, **kwargs)
            
            except Exception, e:
                out = createResponse401(str(e))
                return HttpResponse(json.dumps(out))
        
        try:
            api_key = Key.objects.get(key=api_key)
            if api_key:
                return view(request, *args, **kwargs)
    
        except Exception, e:
            out = createResponse500(str(e))
            return HttpResponse(json.dumps(out))
        
        out = createResponse401('You need to provide a valid api key for the request')
        return HttpResponse(json.dumps(out))
    
    return inner_decorator