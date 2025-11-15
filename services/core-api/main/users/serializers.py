from rest_framework import serializers
from .models import User, Lecturer, Student


class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SerializerMethodField()
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'groups', 'permissions', 'is_staff', 'is_superuser']

    def get_groups(self, obj):
        """Return list of group names"""
        return [group.name for group in obj.groups.all()]

    def get_permissions(self, obj):
        return sorted(list(obj.get_all_permissions()))


class LecturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecturer
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'faculty', 'position', 'status'
        ]


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'index_number', 'field_of_study', 'year_of_study',
            'semester', 'faculty'
        ]
