from django.conf.urls import patterns, include, url

urlpatterns = patterns('api.views',
    
    # Test
    url(r'^test/$','test', name="api_test"),
    # Meta
    url(r'^meta/$','meta', name="api_meta"),
    # Search
    url(r'^search/$','search', name="api_search"),
    #TODO: improve this!
    url(r'^suggest/$','suggest', name="api_suggest"),
	# People
	url(r'^persons/$', 'persons', name="api_person"),	
	url(r'^persons/(?P<person_id>\w+)/$', 'persons', name="api_person"),
	url(r'^persons/(?P<person_id>\w+)/(?P<relation>\w+)/$', 'persons', name="api_person"),
    
)
