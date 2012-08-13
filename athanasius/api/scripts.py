import os
import settings
import pymongo
import pkg_resources
from bson.code import Code
 
SCRIPT_DIR = os.path.join('../scripts')

def initScripts(db):
    '''Initializes server-side javascript functions'''
    scripts = filter(
            lambda f: f.endswith('.js'),
            #os.listdir(settings.SCRIPT_DIR)#
            pkg_resources.resource_listdir(__name__, SCRIPT_DIR)
        )
    for script in scripts:
        # Name the function after the script name
        func_name, _ = script.split('.', 1)
        script_path = os.path.join(SCRIPT_DIR, script)
        # Create a pymongo Code object
        # otherwise it will be stored as a string
        code = Code(pkg_resources.resource_string(__name__, script_path))
        # Upsert the function
        #funcs = db.system.js.find({})
        db.system.js.save({ '_id': func_name, 'value': code, })