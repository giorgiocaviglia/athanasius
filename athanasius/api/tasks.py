#   Celery tasks
#   For mapping etc

import os
import csv
import chardet
from celery import task, current_task

@task()
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




@task()
def findSimilarItems():
    
    return {}


@task()
def add(x):
    return x
