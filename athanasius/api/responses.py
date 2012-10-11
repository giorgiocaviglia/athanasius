
def createResponse200():
    """
    Creates a dict used as a request in json responses.
    Status is set to 1 (success)
    """

    out = dict()
    out['status'] = '200'
    out['statusText'] = 'OK'
    out['result'] = {}
    out['request'] = ''

    return out

def createResponse401(error):
    """
    Creates a dict used as a request in json responses,
    with an error in it and status set to 0 (failure)
    """

    out = dict()
    out['status'] = '401'
    out['statusText'] = 'Bad Request'
    out['message'] = error
    out['request'] = ''
    
    return out

def createResponse500(error):
    """
    Creates a dict used as a request in json responses,
    with an error in it and status set to 0 (failure)
    """

    out = dict()
    out['status'] = '500'
    out['statusText'] = 'Internal Server Error'
    out['message'] = error
    out['request'] = ''

    return out
    
    