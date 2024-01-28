from django.http import (
    HttpResponse, 
    HttpRequest, 
    HttpResponseNotFound, 
    JsonResponse
)
from django.shortcuts import render

from .models import *

def index(request: HttpRequest):
    return render(request, "index.html", context={"title": "Index Page"})

def editor(request: HttpRequest):
    notes = Note.objects.all()

    return render(request, "editor.html", context={"title": "Editor Page", "notes": notes})

def login(request: HttpRequest):
    return render(request, "login.html", context={"title": "Login Page"})

def page_not_found(request: HttpRequest, exception):
    return HttpResponseNotFound(content='Страница не найдена')


def get_note(request: HttpRequest, note_id: int):
    try:
        note = Note.objects.get(pk=note_id)
        data = {
            'id': note.id,
            'title': note.title,
            'content': note.content,
            'created_at': note.created_at.strftime('%Y-%m-%d'),
            'tags': [{
                'id': tag.id,
                'name': tag.name,
            } for tag in note.tags.all()]
        }
        return JsonResponse(data)
    except Note.DoesNotExist:
        return JsonResponse({'error': 'Note not found'}, status=404)