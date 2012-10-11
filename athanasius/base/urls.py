from django.conf.urls import patterns, include, url

urlpatterns = patterns('base.views',
        
    #single object views
    url(r'^$', 'base_index', name="base_index"),
    
    url(r'^account/$', 'base_account', name="base_account"),
    
    url(r'^import/$', 'base_import', name="base_import"),
    
)
