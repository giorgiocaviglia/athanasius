from django.conf.urls import patterns, include, url

urlpatterns = patterns('base.views',
        
    #single object views
    url(r'^$', 'base_index', name="base_index"),
    
)
