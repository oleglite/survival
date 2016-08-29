from django.conf.urls import url

from guard.views import login, logout

urlpatterns = [
    url(r'^auth/login/$', login),
    url(r'^auth/logout/$', logout),
]
