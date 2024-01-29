from django.http import *
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import *

def index(request: HttpRequest):
    return render(request, "index.html", context={"title": "Index Page"})

def login(request: HttpRequest):
    return render(request, "login.html", context={"title": "Login Page"})

def page_not_found(request: HttpRequest, exception):
    return HttpResponseNotFound(content='Страница не найдена')


@ensure_csrf_cookie
def notes(request: HttpRequest):
    notes = Note.objects.all()

    return render(request, "notes.html", context={
        "title": "Notes", 
        "notes": notes, 
    })


# API
def get_note_editor(request: HttpRequest, id: int):
    active_note = Note.objects.get(pk=id)
    tags = Tag.objects.all()

    return render(request, "nested/note_editor.html", context={"active_note": active_note, "tags": tags})

# API
def create_note(request: HttpRequest):
    if request.method == 'POST':
        note = Note.objects.create()

        return JsonResponse({"created_note": note.pk, "error": 0})
    
    return HttpResponseBadRequest("Invalid request method (POST needed)")

# API
def delete_note(request: HttpRequest):
    if request.method == 'POST':
        note_id = request.POST.get('id')

        try:
            note = Note.objects.get(pk=note_id)
        except Note.DoesNotExist:
            return JsonResponse({"error": f"Not found Note with id={note_id}"}, status=404)

        result = note.delete()

        return JsonResponse({"count_deleted": result[0], "error": 0})
    
    return HttpResponseBadRequest("Invalid request method (POST needed)")

# API
def update_note(request):
    if request.method == 'POST':
        note_id = request.POST.get('id')

        try:
            note = Note.objects.get(pk=note_id)
        except Note.DoesNotExist:
            return JsonResponse({"error": f"Not found Note with id={note_id}"}, status=404)

        data = request.POST
        note.title = data.get('title', note.title)
        note.content = data.get('content', note.content)
        note.save()

        return JsonResponse({"updated_note": note_id, "error": 0})

    return HttpResponseBadRequest("Invalid request method (POST needed)")