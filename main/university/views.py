from rest_framework import viewsets
from .models import Faculty, Position, Semester
from .serializers import FacultySerializer, PositionSerializer, SemesterSerializer


class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer


class PositionViewSet(viewsets.ModelViewSet):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


class SemesterViewSet(viewsets.ModelViewSet):
    queryset = Semester.objects.select_related("faculty").all()
    serializer_class = SemesterSerializer
