from rest_framework import serializers
from .models import Faculty, Position, Semester, University, UniversityMembership
from users.serializers import UserSerializer


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


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ["id", "name", "description"]


class UniversityMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    university = UniversitySerializer(read_only=True)
    university_id = serializers.PrimaryKeyRelatedField(
        queryset=University.objects.all(), source="university"
    )

    class Meta:
        model = UniversityMembership
        fields = ["id", "user", "university", "university_id", "position"]
