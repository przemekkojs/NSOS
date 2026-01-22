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


class ScheduleItemSerializer(serializers.ModelSerializer):
    lecturer_name = serializers.SerializerMethodField()

    course_name = serializers.CharField(source='course_group.course.name')
    course_group = serializers.CharField(source='course_group.name')
    room = serializers.CharField(source='course_group.room')

    class Meta:
        model = Schedule
        fields = [
            'date',
            'start_time',
            'end_time',
            'lecturer_name',
            'course_name',
            'course_group',
            'room',
        ]

    def get_lecturer_name(self, obj):
        if obj.lecturer:
            return f"{obj.lecturer.user.first_name} {obj.lecturer.user.last_name}"
        return None
