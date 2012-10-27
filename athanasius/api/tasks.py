#   Celery tasks
#   For mapping etc

import os
import csv
import difflib
import chardet
#from celery import task, current_task
from wrappers import *


def get(o,a):
    r = []
    att = o['attributes']
    for at in att:
        if at['key'] == a:
            r.append(at['value'])
            
    return r
    
def get_one(o,a):
    r = ""
    att = o['attributes']
    for at in att:
        if at['key'] == a:
            r = at['value']
            break
    return r


#@task()
def check_similarity(schema, attributes, items, threshold=0.8):
    """
    A simple api for checking similarity
    
    @attributes =  { attribute : weight, ... }
    """
    
    #TODO: controllare attributes
    try:

        query = { 'schema' : schema }
        data = read_objects('items', query)
        
        if data['status'] != '200':
            return None
        
        found = data['result']['objects']
        result = []

        for i, item in enumerate(items):
            for d in found:
                similarity = []
                weights = 0
                for a in attributes:
                    item_a = get_one(item,a)
                    d_a = get_one(d,a)
                    if item_a != "" and d_a != "":
                        similarity.append(difflib.SequenceMatcher(None, item_a, d_a).ratio() * attributes[a])
                        weights += attributes[a]
                similarity = sum(similarity)/float(weights)
                if similarity >= threshold:
                    similar = {}
                    similar['object_name'] = get_one(item,'mrofl:Literal/mrofl:FullName')
                    similar['similar_name'] = get_one(d,'mrofl:Literal/mrofl:FullName')
                    similar['weight'] = similarity
                    result.append(similar)
            
            progress = 100 * float(i)/float(len(items))
            #current_task.update_state(state='PROGRESS', meta={'current': i, 'total': len(items), 'progress': progress })

    
    except Exception, e:
        return None
    
    #current_task.update_state(state='SUCCESS')
    
    return result



#@task()
def check_similarity_fast(schema, attributes, items, threshold=0.8):
    """
    A simple api for checking similarity
    
    @attributes =  { attribute : weight, ... }
    """
    
    #TODO: controllare attributes
    try:

        query = { 'schema' : schema }
        data = read_objects('items', query)
        
        if data['status'] != '200':
            return None
        
        found = data['result']['objects']
        result = []

        for i, item in enumerate(items):
            for d in found:
                similarity = []
                weights = 0
                for a in attributes:
                    item_a = get_one(item,a)
                    d_a = get_one(d,a)
                    if item_a != "" and d_a != "":
                        s = 1 if (item_a == d_a) else 0
                        similarity.append(s * attributes[a]) 
                        weights += attributes[a]
                similarity = sum(similarity)/float(weights)
                if similarity >= threshold:
                    similar = {}
                    similar['object_name'] = get_one(item,'mrofl:Literal/mrofl:FullName')
                    similar['similar_name'] = get_one(d,'mrofl:Literal/mrofl:FullName')
                    similar['weight'] = similarity
                    result.append(similar)
            
            progress = 100 * float(i)/float(len(items))
            #current_task.update_state(state='PROGRESS', meta={'current': i, 'total': len(items), 'progress': progress })

    
    except Exception, e:
        return None
    
    #current_task.update_state(state='SUCCESS')
    
    return result



#@task()
def uploadFromFile():
    
    dir = os.path.dirname(os.path.abspath(__file__))
    filepath = os.path.join(dir, 'test.txt')
    f = open(filepath,"r")
    
    csv.field_size_limit(1000000000)
    
    # getting file encoding
    result = chardet.detect(f.read())
    encoding = result['encoding']
            
    # determing dialect
    f.seek(0)
    sniffer = csv.Sniffer()
    dialect = sniffer.sniff(f.read())
    dialect.delimiter = "\t"

    # encoding file
    f.seek(0)
    utf8_file = f.read().decode(encoding).encode('utf-8')
    reader = csv.DictReader( utf8_file.splitlines(), dialect=csv.excel_tab )
    rows = list(reader)
    
    # get results
    results = []
    
    for i, row in enumerate(rows):
        results.append(row)
        progress = 100 * float(i)/float(len(rows))
        current_task.update_state(state='PROGRESS', meta={'current': i, 'total': len(rows), 'progress': progress })

    current_task.update_state(state='SUCCESS')
    return results




#@task()
def findSimilarItems():
    
    return {}


#@task()
def add(x):
    return x
