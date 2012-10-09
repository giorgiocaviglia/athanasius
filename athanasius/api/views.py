# Create your views here.
from django.template import Context, loader
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate

from tasks import add

def api_test(request):
    result = add.delay(2, 2)
    ready = result.state  
    return HttpResponse(ready)