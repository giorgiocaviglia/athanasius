from django.conf.urls import patterns, include, url

urlpatterns = patterns('base.views',
        
    # index
    url(r'^$', 'base_index', name="base_index"),
    
    # about
    url(r'^about/$', 'base_about', name="base_about"),
    
    # collections
    url(r'^collections/$', 'base_collections', name="base_collections"),
    
    url(r'^account/$', 'base_account', name="base_account"),
    
    url(r'^import/$', 'base_import', name="base_import"),
    
)
