from django.conf.urls import patterns, include, url

urlpatterns = patterns('api.views',
        
    #single object views
    url(r'test/$', 'api_test', name="api_test"),
    
)
