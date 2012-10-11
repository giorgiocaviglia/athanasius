from django.db import models
from django.forms.models import ModelForm
from django import forms
from django.contrib import admin
from django.contrib.auth.models import User, Group, Permission
from settings import API_KEY_SIZE

import time
from datetime import datetime
import hashlib
import tasks
from django.dispatch import receiver


from djcelery.models import TaskMeta
from celery.result import BaseAsyncResult
from celery.signals import *
import processes
#from processes import *

class Session(models.Model):
    
    name = models.CharField(max_length=50, null=True)
    owner = models.ForeignKey(User)
    sequence_name = models.CharField(max_length=50, null=True)
    session_id = models.CharField(max_length=50, null=True)
    last_successfull_process = models.CharField(max_length=50, null=True)
    created_at = models.DateTimeField(default=datetime.utcnow)
    completed = models.BooleanField(default=False)

    def __unicode__(self):
        return self.name
    
    def run(self):
        
        getattr(processes, sequence_name, None)
        
        return True
    
    
    def sequence(self):
        return getattr(processes, self.sequence_name, None)
        
    
    def next(self):
        
        if self.completed:
            return False
        
        sequence = getattr(processes, self.sequence_name, None) 
        if self.last_successfull_process is None:
            next_process = sequence[0]
        else:
            if sequence.index(self.last_successfull_process)+1 > len(sequence)-1:
                return False
            next_process = sequence[sequence.index(self.last_successfull_process)+1]
        
        #process = getattr(processes, next_process, None)

        return next_process


class Collection(models.Model):
    
    """
    A data Collection
    """
    
    name = models.CharField(max_length=16, null=True)
    full_name = models.CharField(max_length=200, null=True)
    owner = models.ForeignKey(User)
    curator = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(default=datetime.utcnow)
    is_archive = models.BooleanField(default=False)
    url = models.URLField()
    
    
    def __unicode__(self):
        return self.name



class Process(models.Model):
    
    """
    A general task keeping track of all the stuff
    """
    
    name = models.CharField(max_length=50, null=True)
    owner = models.ForeignKey(User)
    task_id = models.CharField(max_length=50, null=True)
    created_at = models.DateTimeField(default=datetime.utcnow)
    
    # Return the entire result object
    def task(self):
        return BaseAsyncResult(self.task_id)
    
    # Return task status    
    def state(self):
        return self.task().state
    
    # Return task info (metadata)    
    def info(self):
        return self.task().info
    
    # Return task backend (where the data are..?)    
    def backend(self):
        return self.task().backend
                
    # Return task result    
    def result(self):
        return self.task().result    
    
    def __unicode__(self):
        return self.task_id



class Key(models.Model):

    user = models.ForeignKey(User)
    key = models.CharField(max_length=API_KEY_SIZE, unique=True, blank=True, default='')
    created_at = models.DateTimeField(default=datetime.utcnow)
    #logged_ip = models.CharField(max_length=32, blank=True, null=True, default=None)
    #last_used = models.DateTimeField(default=datetime.utcnow)
    #created = models.DateTimeField(default=datetime.utcnow)
    
    # Generate a new key value
    def generate(self):
        self.key = hashlib.md5('%s-%s' % (self.user.email, datetime.utcnow())).hexdigest()[:API_KEY_SIZE]
        return self.key

    def __unicode__(self):
        return 'ApiKey: %s' % (self.key)


#   now = datetime.utcnow()
#   kstr = hashlib.md5('%s-%s' % (user.email, now)).hexdigest()[:KEY_SIZE]