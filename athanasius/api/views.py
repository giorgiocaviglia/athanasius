# Create your views here.
from django.template import Context, loader
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate

from models import AthanasiusTask
from tasks import add
import json


def api_test(request):
    
    result = add.delay(10000)
    AthanasiusTask.objects.create(owner=request.user, task_id=result.task_id)
    
    # retrieving tasks for the user
    user_tasks = AthanasiusTask.objects.filter(owner=request.user)
    
    response = []
    
    for task in user_tasks:
        r = {}
        r['id'] = task.task_id
        r['status'] = task.status()
        #r['result'] = task.result()
        response.append(r)
    
    return HttpResponse(json.dumps(response))


def api_tasks(request):
    
    # checking if current user has open tasks
    tasks = AthanasiusTask.objects.get(owner=request.user)

    return HttpResponse(user)