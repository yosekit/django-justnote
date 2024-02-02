from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpRequest, HttpResponseNotFound
from django.urls import reverse
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *


def index(request: HttpRequest):
    return render(request, "index.html", context={"title": "Index Page"})

def login(request: HttpRequest):
    return render(request, "login.html", context={"title": "Login Page"})

def page_not_found(request: HttpRequest, exception):
    return HttpResponseNotFound(content='Страница не найдена')

# region Note Views

# @ensure_csrf_cookie
@api_view(['GET'])
def read_notes(request: HttpRequest):
    if request.method == 'GET':
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, context={'request': request}, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def read_note(request: HttpRequest, pk: int):
    if request.method == 'GET':
        note = Note.objects.get(pk=pk)
        serializer = NoteSerializer(note, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_note(request: HttpRequest):
    if request.method == 'POST':
        note = Note.objects.create()
        serializer = NoteSerializer(note, context={'request': request})

        location = reverse('read_note', kwargs={'pk': note.pk})
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers={
            "Location": location
        })
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_note(request: HttpRequest, pk: int):
    if request.method == 'DELETE':
        note = get_object_or_404(Note, pk=pk)

        count, per_objects = note.delete()
        return Response(data={'count': count}, status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_note(request: HttpRequest, pk: int):
    if request.method == 'PUT':
        note = get_object_or_404(Note, pk=pk)

        serializer = NoteSerializer(note, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_400_BAD_REQUEST)

# endregion

# region Tag Views

@api_view(['GET'])
def read_tags(request: HttpRequest):
    if request.method == 'GET':
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, context={'request': request}, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def read_tags_except(request: HttpRequest, note_pk: int):
    if request.method == 'GET':
        note = get_object_or_404(Note, pk=note_pk)
        
        note_tags = note.tags.all()
        tags = Tag.objects.exclude(id__in=note_tags.values_list('id', flat=True))
        serializer = TagSerializer(tags, context={'request': request}, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_tag(request: HttpRequest):
    if request.method == 'POST':
        tag = Tag.objects.create()
        serializer = TagSerializer(tag, context={'request': request})

        location = reverse('read_tag', kwargs={'pk': tag.pk})
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers={
            "Location": location
        })
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_tag(request: HttpRequest, pk: int):
    if request.method == 'DELETE':
        tag = get_object_or_404(Tag, pk=pk)

        count, per_objects = tag.delete()
        return Response(data={'count': count}, status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def add_tag_to_note(request: HttpRequest, tag_pk: int, note_pk: int):
    if request.method == 'PUT':
        tag = get_object_or_404(Tag, pk=tag_pk)
        note = get_object_or_404(Note, pk=note_pk)
        
        note.tags.add(tag)
        return Response(status=status.HTTP_202_ACCEPTED)

    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def remove_tag_from_note(request: HttpRequest, tag_pk: int, note_pk: int):
    if request.method == 'PUT':
        tag = get_object_or_404(Tag, pk=tag_pk)
        note = get_object_or_404(Note, pk=note_pk)
        
        note.tags.remove(tag)
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)

# endregion

 