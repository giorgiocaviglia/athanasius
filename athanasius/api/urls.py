from django.conf.urls import patterns, include, url

urlpatterns = patterns('api.views',
    
    # Test
    url(r'^test/$','test', name="api_test"),
    # Login
    url(r'^login/$','api_login', name="api_login"),
    # Meta
    url(r'^meta/$','meta', name="api_meta"),
    # archive
    url(r'^archive/$','archive', name="api_archive"),    
    # Search
    url(r'^search/$','search', name="api_search"),
    #TODO: improve this!
    url(r'^suggest/$','suggest', name="api_suggest"),
	# People
	url(r'^persons/$', 'persons', name="api_person"),	
	url(r'^persons/(?P<person_id>\w+)/$', 'persons', name="api_person"),
	url(r'^persons/(?P<person_id>\w+)/(?P<relation>\w+)/$', 'persons', name="api_person"),
    
	url(r'^extract/$', 'extract', name="api_extract"),	
    
    
)
