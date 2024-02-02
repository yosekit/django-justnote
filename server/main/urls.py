from django.urls import path, re_path
from . import views

urlpatterns = [
    path("", views.index, name="index"),

    path("api/notes/", views.read_notes, name="read_notes"),
    path("api/note/<int:pk>/", views.read_note, name="read_note"),
    path("api/note/create/", views.create_note, name="create_note"),
    path("api/note/delete/<int:pk>/", views.delete_note, name="delete_note"),
    path("api/note/update/<int:pk>/", views.update_note, name="update_note"),

    path("api/tags/", views.read_tags, name="read_tags"),
    path("api/tags/except/<int:note_pk>/", views.read_tags_except, name="read_tags_except"),
    path("api/tag/create/", views.create_tag, name="create_tag"),
    path("api/tag/delete/<int:pk>/", views.delete_tag, name="delete_tag"),
    path("api/tag/add/<int:tag_pk>/to/note/<int:note_pk>/", views.add_tag_to_note, name="add_tag_to_note"),
    path("api/tag/remove/<int:tag_pk>/from/note/<int:note_pk>/", views.remove_tag_from_note, name="remove_tag_from_note"),
]