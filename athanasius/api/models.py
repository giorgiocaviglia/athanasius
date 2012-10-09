from django.db import models
from django.forms.models import ModelForm
from django import forms
from django.contrib import admin
from django.contrib.auth.models import User, Group, Permission
from settings import API_KEY_SIZE

import time
import datetime
import hashlib

from djcelery.models import TaskMeta
from celery.result import BaseAsyncResult

class AthanasiusTask(models.Model):

    owner = models.ForeignKey(User)
    task_id = models.CharField(max_length=50, blank=True, null=True, default=None)
    
    # Return aync result (containing info about task)
    def task(self):
        return BaseAsyncResult(self.task_id)
    
    # Return task status    
    def status(self):
        return self.task().status
    
    # Return task status    
    def result(self):
        return self.task().result
    
    def __unicode__(self):
        return self.task_id


class ApiKey(models.Model):

    user = models.ForeignKey(User)
    key = models.CharField(max_length=API_KEY_SIZE, unique=True, blank=True, default='')
    logged_ip = models.CharField(max_length=32, blank=True, null=True, default=None)
    #last_used = models.DateTimeField(default=datetime.utcnow)
    #created = models.DateTimeField(default=datetime.utcnow)

    def __unicode__(self):
        return 'ApiKey: %s' % (self.key)


#   now = datetime.utcnow()
#   kstr = hashlib.md5('%s-%s' % (user.email, now)).hexdigest()[:KEY_SIZE]