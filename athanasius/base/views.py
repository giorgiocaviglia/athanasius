# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, render_to_response
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required, user_passes_test

@login_required(login_url="/login/")
def base_index(request):
    return HttpResponse("ok");