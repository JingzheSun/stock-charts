from django.conf.urls import url
from . import view


urlpatterns = [
    url('stocks', view.fetchData),
    url('', view.entry),
]
