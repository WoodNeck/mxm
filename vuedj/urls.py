"""vuedj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views
from app.views import index
from app.views import login
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/', include('app.urls')),
    url(r'^api/login/$', login, name='login'),
    url(r'^api/logout/$', views.logout, {'next_page': '/'}, name='logout'),
    url(r'^api/auth/', include('social_django.urls', namespace='social')),
    url(r'^$', index, name='index'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
