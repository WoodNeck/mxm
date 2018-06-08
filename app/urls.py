from django.conf.urls import url
from app import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^myid/$', views.CurrentUser.as_view()),
    url(r'^clothes/$', views.ClothesList.as_view()),
    url(r'^clothes/(?P<pk>[0-9]+)/$', views.ClothesDetail.as_view()),
    url(r'^clothes/user=(?P<userID>[0-9]+)/page=(?P<page>[0-9]+)/$', views.ClothesOfUser.as_view()),
    url(r'^clothes/mxm=(?P<mxmID>[0-9]+)/$', views.ClothesOfMxM.as_view()),
    url(r'^tag/$', views.TagList.as_view()),
    url(r'^mxms/$', views.MxMList.as_view()),
    url(r'^mxms/(?P<pk>[0-9]+)/$', views.MxMDetail.as_view()),
    url(r'^mxms/user=(?P<userID>[0-9]+)/page=(?P<page>[0-9]+)/$', views.MxMsOfUser.as_view()),
    url(r'^replies/$', views.ReplyList.as_view()),
    url(r'^replies/(?P<pk>[0-9]+)/$', views.ReplyDetail.as_view()),
    url(r'^replies/mxm=(?P<mxmID>[0-9]+)/page=(?P<page>[0-9]+)/$', views.RepliesOfMxM.as_view()),
    url(r'^ratings/$', views.RatingList.as_view()),
    url(r'^ratings/(?P<pk>[0-9]+)/$', views.RatingDetail.as_view()),
    url(r'^ratings/mxm=(?P<mxmID>[0-9]+)/page=(?P<page>[0-9]+)/$', views.RatingsOfMxM.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
