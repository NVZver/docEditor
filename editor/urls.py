from django.conf.urls import url
from editor import views

urlpatterns = [
    url(r'^', views.editor)
]
