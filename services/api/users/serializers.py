from rest_framework import serializers
from .models import User, Lecturer, Student


class UserSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()
    groups = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "permissions",
            "groups",
            "role",
        ]

    def get_permissions(self, obj):
        """Return list of permission codenames user has (from groups + user permissions)"""
        return list(obj.get_all_permissions())

    def get_groups(self, obj):
        """Return list of group names user belongs to"""
        return list(obj.groups.values_list("name", flat=True))

    def get_role(self, obj):
        """Return primary role: admin, lecturer, or student"""
        if obj.is_superuser:
            return "admin"
        elif obj.is_lecturer:
            return "lecturer"
        elif obj.is_student:
            return "student"
        return "user"


class LecturerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)

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
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)

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
