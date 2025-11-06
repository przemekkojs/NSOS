from rest_framework import serializers
from .models import Course, CourseGroup, Class, Schedule


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id', 'course_code', 'name', 'weekly_hours', 'weeks_count',
            'ects', 'course_group', 'course_type', 'faculty'
        ]


class CourseGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseGroup
        fields = [
            'id', 'course', 'name', 'lecturer', 'weekday',
            'start_time', 'end_time', 'room', 'semester'
        ]


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'lecturer', 'course_group', 'date_held']


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = [
            'id', 'lecturer', 'student', 'course_group',
            'date', 'start_time', 'end_time'
        ]
