from rest_framework import serializers
from .models import Faculty, Position, Semester


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ["id", "name", "description"]


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ["id", "name", "hourly_rate", "workload"]


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = [
            "id",
            "name",
            "faculty",
            "type",
            "academic_year",
            "start_date",
            "end_date",
        ]
