# Create your views here.
import bson
import json
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, render_to_response
from django.template import RequestContext, loader
from django.core.urlresolvers import reverse
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required, user_passes_test

from api import *
from helpers import *
from mongowrapper import MongoWrapper

#@login_required
def test(request):
    response = testDB(request)
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")

def meta(request):
    response = getMeta(request)
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")

    
def search(request):
    response = getSearch(request)
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")

def suggest(request):
    response = getSuggest(request)
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")


def persons(request, person_id=None, relation=None):
    
    if person_id:
        if relation:            
            if relation == 'correspondents':
                response = getPersonCorrespondents(request, person_id)
            elif relation == 'letters':
                response = getPersonLetters(request, person_id)
            else:
                response = createResponseObjectWithError("Not a valid relation, sorry")
        else:
            response = getPerson(request, person_id)        
    else:
        response = getPersons(request)

    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")
