#   parsers.py
#   Athanasius Data Parsers

import csv, json
import chardet
import logging



def parse_uploaded(f):
    
    try:
        
        logging.info("siamo partiti cazzo")
        
        csv.field_size_limit(1000000000)
        
        # 1. getting file encoding
        result = chardet.detect(f.read())
        encoding = result['encoding']

        # 2. determing dialect
        f.open()
        sniffer = csv.Sniffer()
        dialect = sniffer.sniff(f.read())
        dialect.delimiter = "\t"

        # 3. encoding file
        f.open()
        utf8_file = f.read().decode(encoding).encode('utf-8')
        reader = csv.DictReader( utf8_file.splitlines(), dialect=csv.excel_tab )

        # 4. get results
        results = [row for row in reader]
    
    except Exception, e:
        logging.info(str(e))
    
    return results


def parse_csv(file_name, delimiter='\t'):
    
    f = open(file_name,"r")
    
    #csv.field_size_limit(1000000000)
    
    # getting file encoding
    result = chardet.detect(f.read())
    encoding = result['encoding']
            
    # determing dialect
    f.seek(0)
    sniffer = csv.Sniffer()
    dialect = sniffer.sniff(f.read())
    dialect.delimiter = delimiter

    # encoding file
    f.seek(0)
    utf8_file = f.read().decode(encoding).encode('utf-8')
    reader = csv.DictReader( utf8_file.splitlines(), dialect=csv.excel_tab )
    rows = list(reader)
    
    # get results
    results = []
    
    for i, row in enumerate(rows):
        print row
        results.append(row)
    
    f.close()
    
    return results


def parse_json(file_name, delimiter='\t'):
    
    f = open(file_name,"r")
    reader = json.load(f)
    
    return reader