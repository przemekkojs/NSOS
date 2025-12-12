from rest_framework import serializers
from .models import User, Lecturer, Student


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]


class LecturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecturer
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "faculty",
            "position",
            "status",
        ]


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "index_number",
            "field_of_study",
            "year_of_study",
            "semester",
            "faculty",
        ]
