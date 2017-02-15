from django.conf.urls import url
from editor import views

urlpatterns = [
    url(r'^get/', views.get_docs),
    url(r'^', views.editor)
]
