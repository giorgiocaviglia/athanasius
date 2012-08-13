from django.conf.urls import patterns, include, url

urlpatterns = patterns('base.views',

    # index
    url(r'^$','index', name="base_index"),

    # explore
    url(r'^explore/$','explore', name="base_explore"),
    url(r'^explore/persons/(?P<person_id>\w+)/$','explore', name="base_explore"),

    # api-info
    url(r'^api-info/$','api_info', name="base_api_info"),

    
)
