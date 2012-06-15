from django.conf.urls import patterns, include, url
from django.contrib.auth.views import login, logout

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'athanasius.views.home', name='home'),
    # url(r'^athanasius/', include('athanasius.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('',
    # existing patterns here...
    (r'^accounts/login/$',  login),
    (r'^accounts/logout/$', logout),
)

urlpatterns += patterns('api.views',
    url(r'^api/query/archives', 'get_archives'),
    url(r'^api/query/letters', 'get_letters'),
    url(r'^prepare/places', 'prepare_places'),


)

urlpatterns += patterns('ink.views',
    url(r'^ink/', 'index'),
)