# processes.py

IMPORT_SEQUENCE = ['upload', 'mapping', 'merging']


def upload(request, session):
    return "upload"


def mapping(request, session):
    return "mapping"


def merging(request, session):
    return "merging"



