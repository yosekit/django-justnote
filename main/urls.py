from django.urls import path

from . import views

urlpatterns = [
    path("", views.index),
    path("editor/", views.editor),
    path("login/", views.login),

    path("ajax/get_note/<int:note_id>/", views.get_note),
]