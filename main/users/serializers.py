from rest_framework import serializers
from .models import User, Lecturer, Student


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class LecturerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = Lecturer
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'faculty', 'position', 'status'
        ]

class StudentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = Student
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'index_number', 'field_of_study', 'year_of_study',
            'semester', 'faculty'
        ]
