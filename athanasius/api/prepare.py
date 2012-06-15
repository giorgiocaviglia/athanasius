import json
import csv
import re
import traceback

from datetime import date

def format_date(data):
	
	for d in data:
		d['formatdate'] = str(date(int(d['DateYear']),int(d['DateMonth']),int(d['DateDay'])))
	
	return data	
	
	
def format_people():
	f = open("data/people.json")

def format_places():
	f = open("data/place.json")
	data = json.load(f)
	data = data['result']
	
	places = {}
	try :
		for d in data:
			"""
			if len(d['City']) < 2:
				if len(d['Region']) < 2:
					if len(d['Country']) < 2:
						print 'problema'
					else:
						d['FullName'] = d['Country']
				else:
					d['FullName'] = d['Region']
			else:
				d['FullName'] = d['City']

			if 'LatLon' in d:
				d['Coords'] = d['LatLon'] 
			"""
			d['_id'] = d['PrimaryKey']
		
			places[d['PrimaryKey']] = d

		f2 = open("data/prepared/places.json","wb")
		f2.write(json.dumps(places))
		
		return "Places correctly prepared."
		
	except Exception, e:
		traceback.print_exc()
		return False