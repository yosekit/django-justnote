from django.db.models import *


class Tag(Model):
    name = CharField(max_length=16, unique=True)

    def __str__(self) -> str:
        return self.name


class Note(Model):
    title = CharField(max_length=256)
    content = TextField(blank=True)
    created_at = DateTimeField(auto_now_add=True)
    tags = ManyToManyField(Tag)

    def __str__(self) -> str:
        return self.title

