#   Celery tasks
#   For mapping etc

from celery import task


@task()
def findSimilarItems():
    
    return {}



@task()
def add(x):
    return range(x)
