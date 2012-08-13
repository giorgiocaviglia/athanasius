# Create your views here.
from django.http import HttpResponse
from django.template import Context, RequestContext, loader
from django.shortcuts import render, get_object_or_404, render_to_response
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required, user_passes_test
import json 

def index(request):
    c = RequestContext(request)
    return render_to_response("base/index.html", {}, context_instance = c)

def api_info(request):
    c = RequestContext(request)
    return render_to_response("base/api-info.html", {}, context_instance = c)


@login_required(login_url="/login/")
def explore(request, person_id=None):
    
    if person_id:
        data = { "person_id" : person_id }
        c = RequestContext(request,data)
        return render_to_response("base/explore_persons.html", c)     
    else:
        c = RequestContext(request)
        return render_to_response("base/explore.html", c)
    
    


