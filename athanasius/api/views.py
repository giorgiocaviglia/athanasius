# Create your views here.
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from query import *
from prepare import *

def get_letters( request ):	
	return HttpResponse( query_get_letters(request), mimetype="application/json" )

@login_required
def get_archives( request ):
	return HttpResponse( query_get_archives(request), mimetype="application/json" )

def prepare_people( request ):
	format_people()
	return HttpResponse("")

def prepare_places( request ):
	if format_places() == False:
		msg = "Problema"
	else:
		msg = "Buono"
	return HttpResponse(msg)