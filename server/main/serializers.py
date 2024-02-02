from rest_framework.serializers import ModelSerializer
from .models import *


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = (
            'pk',
            'name',
        )

class NoteSerializer(ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Note
        fields = (
            'pk',
            'title',
            'content',
            'created_at',
            'tags',
        )
