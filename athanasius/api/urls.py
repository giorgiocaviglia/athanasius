from django.conf.urls import patterns, include, url

urlpatterns = patterns('api.views',
        
    url(r'^test/$', 'api_test', name="api_test"),
    
    url(r'^tasks/$', 'api_tasks', name="api_tasks"),
    
    url(r'^fake/$', 'fake_import', name="fake_import"),
    
    
    # Collections
    url(r'^collections/$', 'api_collections', name='api_collections'),
    url(r'^collections/(?P<collection_id>\w+)/$', 'api_collections', name='api_collections'),
    
    # Items
    url(r'^items/$', 'api_items', name='api_items'),
    url(r'^items/(?P<item_id>\w+)/$', 'api_items', name='api_items'),
    
    # Schemas
    url(r'^schemas/$', 'api_schemas', name='api_schemas'),
    url(r'^schemas/(?P<schema_id>\w+)/$', 'api_schemas', name='api_schemas'),
    
    
    # utils
    url(r'^scratch/$', 'api_scratch', name='api_scratch'),
    url(r'^upload/$', 'api_upload', name='api_upload'),
    url(r'^parse/$', 'api_parse', name='api_parse'),
    url(r'^merge/$', 'api_merge', name='api_merge'),
    
    
    
)
