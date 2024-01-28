from django.http import HttpResponse, HttpRequest, HttpResponseNotFound
from django.shortcuts import render

def index(request: HttpRequest):
    return render(request, "index.html", context={"title": "Index Page"})

def editor(request: HttpRequest):
    return render(request, "editor.html", context={"title": "Editor Page"})

def login(request: HttpRequest):
    return render(request, "login.html", context={"title": "Login Page"})

def page_not_found(request: HttpRequest, exception):
    return HttpResponseNotFound(content='Страница не найдена')