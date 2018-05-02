from django.conf.urls import url
from app import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^mxms/$', views.MxMList.as_view()),
	url(r'^mxms/(?P<pk>[0-9]+)/$', views.MxMDetail.as_view()),
	url(r'^replies/$', views.ReplyList.as_view()),
	url(r'^replies/(?P<pk>[0-9]+)/$', views.ReplyDetail.as_view()),
	url(r'^ratings/$', views.RatingList.as_view()),
	url(r'^ratings/(?P<pk>[0-9]+)/$', views.RatingDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
