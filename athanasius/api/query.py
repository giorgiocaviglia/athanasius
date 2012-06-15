#
# The basic query system for api
#
import urllib
import urllib2
import json
# get info ot connect to the api
from django.conf import settings
from django.contrib.auth.decorators import login_required

from prepare import *

def connect( data ):
	
	# get the request
	query = urllib.urlencode(data)
	
	# create a password manager
	password_mgr = urllib2.HTTPPasswordMgrWithDefaultRealm()
	
	# Add the username and password.
	top_level_url = settings.API['url']
	password_mgr.add_password( None, top_level_url, settings.API['user'], settings.API['password'] )

	handler = urllib2.HTTPBasicAuthHandler(password_mgr)

	# create "opener" (OpenerDirector instance)
	opener = urllib2.build_opener(handler)

	# Install the opener.
	# Now all calls to urllib2.urlopen use our opener.
	urllib2.install_opener(opener)
	
	f = urllib2.urlopen(top_level_url + query )
	
	# return the response from the api service
	return json.load(f)


def query_get_archives( request ):
	
	# request
	data = {}
	data = request.GET.copy()
	data['action'] = 'query'
	data['class'] = 'Archive'
	
	# response
	response = connect(data)
	result = response['result']
	return result


def query_get_letters( request ):
	data = {}
	data = request.GET.copy()
	data['action'] = 'query'
	data['class'] = 'Letter'
	data['DateYear__gte'] = '1830'
	data['DateYear__lte'] = '1831'
	
	response = connect(data)
	result = response['result']
	return result
	