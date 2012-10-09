from django.conf.urls import patterns, include, url

urlpatterns = patterns('api.views',
        
    url(r'test/$', 'api_test', name="api_test"),
    
    url(r'tasks/$', 'api_tasks', name="api_tasks"),
    
)
