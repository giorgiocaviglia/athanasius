# Create your views here.
import bson
import json
import csv
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, render_to_response
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_exempt
from django.core.urlresolvers import reverse
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import authenticate

from api import *
from helpers import *
from mongowrapper import MongoWrapper

import StringIO
import string

class UnicodeWriter(object):
    
    def __init__(self, f, dialect=csv.excel_tab, encoding="utf-16", **kwds):
        # Redirect output to a queue
        self.queue = StringIO.StringIO()
        self.writer = csv.writer(self.queue, dialect=dialect, **kwds)
        self.stream = f
        self.encoding = encoding
    
    def writerow(self, row):
		try:
			# Modified from original: now using unicode(s) to deal with e.g. ints
			self.writer.writerow([unicode(s).encode("utf-8") for s in row])
			# Fetch UTF-8 output from the queue ...
			data = self.queue.getvalue()
			data = data.decode("utf-8")
			# ... and reencode it into the target encoding
			data = data.encode(self.encoding)
			# write to the target stream
			self.stream.write(data)
			# empty queue
			self.queue.truncate(0)
		
		except UnicodeDecodeError as e:
			print e
    
    def writerows(self, rows):
        for row in rows:
            self.writerow(row)

class UnicodeDictWriter(UnicodeWriter):
     
    def __init__(self, f, fields, dialect=csv.excel_tab,
            encoding="utf-16", **kwds):
        super(UnicodeDictWriter, self).__init__(f, dialect, encoding, **kwds)
        self.fields = fields
    
    def writerow(self, drow):
        row = [drow.get(field, '') for field in self.fields]
        super(UnicodeDictWriter, self).writerow(row)



@csrf_exempt
def api_login(request):
    message = "User is authenticated. You need to login!"
    
    username = getAuth(request)['username']
    password = getAuth(request)['password']
        
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            message = "yeah! You provided a correct username and password!"
        else:
            message = "Sorry, your account has been disabled!"
    else:
        message = "Your username and password were incorrect."

    return HttpResponse(json.dumps({'message' : message}))

#@login_required(login_url="/api/login/")
def test(request):
    response = testDB(request)
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")

def meta(request):
    response = getMeta(request)
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")

def archive(request):
    response = getArchive(request)
    f = open("temp.json","wb")
    f.write(json.dumps(response, default=bson.json_util.default))
    f.close()
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")

    
def search(request):
    response = getSearch(request)
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")

def suggest(request):
    response = getSuggest(request)
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")

def dump(request):
    response = getDump(request)
    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")


def persons(request, person_id=None, relation=None):
    
    if person_id:
        if relation:            
            if relation == 'correspondents':
                response = getPersonCorrespondents(request, person_id)
            elif relation == 'letters':
                response = getPersonLetters(request, person_id)
            elif relation == 'geoletters':
                response = getPersonGeoLetters(request, person_id)
            else:
                response = createResponseObjectWithError("Not a valid relation, sorry")
        else:
            response = getPerson(request, person_id)        
    else:
        response = getPersons(request)

    return HttpResponse(json.dumps(response, default=bson.json_util.default), mimetype="application/json")


######################
# Provisional Stuff! #
######################



def extract(request):
    
    f = open("ee.letters.json","r")
    data = json.load(f)
    list = {}
    
    for d in data['results']['records']:
        l = {}
        l['Raw'] = d['SourceRaw']
        l['City'] = d['SourceCity']
        l['Country'] = d['SourceCountry']
        l['Region'] = d['SourceRegion']
        l['Coords'] = ""
        
        if not l['Raw'] in list:
            list[l['Raw']] = l
        
        l = {}
        l['Raw'] = d['DestinationRaw']
        l['City'] = d['DestinationCity']
        l['Country'] = d['DestinationCountry']
        l['Region'] = d['DestinationRegion']
        l['Coords'] = ""
        
        if not l['Raw'] in list:
            list[l['Raw']] = l
        
    print "finito l", list
    
    fp = open("ink.places.json","r")
    data = json.load(fp)
    
    for d in [v for (k,v) in data.iteritems()]:
        if 'FullName' in d and d['FullName'] in list and 'Coords' in d:
            list[d['FullName']]['Coords'] = d['Coords']
    
    
    f2 = open("results.txt","wb")
    
    wh = UnicodeWriter(f2)
    wh.writerow(['Raw','City','Country','Region','Coords'])
    
    listArray = [v for (k,v) in list.iteritems()]
    
    w = UnicodeDictWriter(f2,['Raw','City','Country','Region','Coords'])
    w.writerows(listArray)
    
    return HttpResponse("ok")
    
    
    
