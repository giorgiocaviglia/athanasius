#   Celery tasks
#   For mapping etc

from celery import task

@task()
def add(x, y):
    return x + y
