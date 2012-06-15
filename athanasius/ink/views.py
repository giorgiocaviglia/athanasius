# Create your views here.
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from api.query import *

def index( request ):
	
	return HttpResponse(json.dumps(query_get_letters(request)),mimetype='application/json')