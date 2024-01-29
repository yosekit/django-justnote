from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),

    path("notes/", views.notes, name="notes"),

    path("api/get_note_editor/<int:id>/", views.get_note_editor),
    path("api/create_note/", views.create_note),
    path("api/delete_note/", views.delete_note),
    path("api/update_note/", views.update_note),
]