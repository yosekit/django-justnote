from django.urls import path, include
from django.contrib import admin

from main import views

urlpatterns = [
    path("", include("main.urls")),
    path("admin/", admin.site.urls),
]

handler404 = views.page_not_found