# Create your views here.
from django.template import Context, RequestContext, loader
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, render_to_response
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required, user_passes_test

from api.responses import *
from api.models import Key, Process
from api.helpers import *
import json


from forms import *

def base_index(request):
    c = RequestContext(request)
    return render_to_response("base/index.html", c)
   

def base_about(request):
    data = {}
    data['page'] = 'about'
    c = RequestContext(request, data)
    return render_to_response("base/about.html", c)


@login_required(login_url="/login/")
def base_collections(request):
    data = {}
    data['page'] = 'collections'
    c = RequestContext(request, data)
    
    return render_to_response("base/collections.html", c) 

def base_import(request):
    
    action = request.GET.get('action') or request.POST.get('action') or None
    session = request.GET.get('session') or request.POST.get('session') or None#get_session(request)
    
    if action is None or action == 'upload':
        template = "base/import.upload.html"
        c = RequestContext(request)
    
    if action == 'select_schema':
        template = "base/import.select_schema.html"
        data = {}
        data['session'] = session
        print session
        c = RequestContext(request, data)
    
    if action == 'mapping':
        template = "base/import.mapping.html"
        data = {}
        data['session'] = session
        print session
        c = RequestContext(request, data)
    
    if action == 'define_new_schema':
        template = "base/import.define_new_schema.html"
        data = {}
        data['session'] = session
        print session
        c = RequestContext(request, data)
    
    if action == 'merging':
        template = "base/import.merging.html"
        data = {}
        data['session'] = session
        print session
        c = RequestContext(request, data)
    
    return render_to_response(template, c)
    
    


@login_required(login_url="/login/")
def base_import_upload(request):
    data = {}    
    c = RequestContext(request, data)
    return render_to_response("base/import.upload.html", c)





@login_required(login_url="/login/")
def base_account(request):
    
    #AthanasiusTask.objects.all().delete()
    
    # check if user has a valid api_key
    try:
        api_key = Key.objects.get(user=request.user)
    except:
        api_key = Key.objects.create(user=request.user)
        api_key.generate()
        api_key.save()
    
    response = createResponse200()
    response['result'] = {}
    response['result']['api_key']=api_key.key
    
    response['result']['tasks'] = []
    
    
    try:
        tasks = Process.objects.filter(owner=request.user)
        for task in tasks:
            
            r = {}
            r['id'] = task.task_id
            r['name'] = task.name
            r['state'] = task.state()
            
            r['created_at'] = str(task.created_at)
            r['owner'] = task.owner.username
                        
            if r['state'] == "SUCCESS":
                r['result'] = task.result()[0:10]
                #task.task().forget()
                
            if r['state'] == "PROGRESS":
                r['result'] = task.info()
                        
            if r['state'] == "FAILURE":
                r['verbose_message'] = str(task.task().traceback)
                r['message'] = str(task.info())
            
            response['result']['tasks'].append(r)
    
    except Exception, e:
        print str(e)
        # let's have a fake task
    
    #AthanasiusTask.objects.create(owner=request.user)
            
    return HttpResponse(json.dumps(response), mimetype="application/json")