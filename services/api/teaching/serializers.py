from rest_framework import serializers
from .models import Course, CourseGroup, Class, Schedule


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            "id",
            "course_code",
            "name",
            "weekly_hours",
            "weeks_count",
            "ects",
            "course_group",
            "course_type",
            "faculty",
        ]


class CourseGroupSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = CourseGroup
        fields = [
            "id",
            "course",
            "name",
            "lecturer",
            "weekday",
            "start_time",
            "end_time",
            "room",
            "semester",
        ]


class ClassSerializer(serializers.ModelSerializer):
    course_group = CourseGroupSerializer(read_only=True)

    class Meta:
        model = Class
        fields = ["id", "lecturer", "course_group", "date_held"]


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = [
            "id",
            "lecturer",
            "student",
            "course_group",
            "date",
            "start_time",
            "end_time",
        ]


class ScheduleItemSerializer(serializers.ModelSerializer):
    """Serializer for calendar view with course and lecturer details"""

    course_name = serializers.CharField(
        source="course_group.course.name", read_only=True
    )
    course_code = serializers.CharField(
        source="course_group.course.course_code", read_only=True
    )
    room = serializers.CharField(source="course_group.room", read_only=True)
    lecturer_name = serializers.SerializerMethodField()
    group_name = serializers.CharField(source="course_group.name", read_only=True)

    class Meta:
        model = Schedule
        fields = [
            "id",
            "date",
            "start_time",
            "end_time",
            "course_name",
            "course_code",
            "room",
            "lecturer_name",
            "group_name",
        ]

    def get_lecturer_name(self, obj):
        if obj.course_group.lecturer:
            return f"{obj.course_group.lecturer.user.first_name} {obj.course_group.lecturer.user.last_name}"
        return None


class CalendarEventSerializer(serializers.Serializer):
    """Serializer that formats schedule data for FullCalendar"""

    id = serializers.IntegerField()
    title = serializers.SerializerMethodField()
    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()
    extendedProps = serializers.SerializerMethodField()

    def get_title(self, obj):
        """Format: CS101 - Group 1"""
        return f"{obj.course_group.course.course_code} - {obj.course_group.name}"

    def get_start(self, obj):
        """Combine date and start_time into ISO datetime"""
        from datetime import datetime

        dt = datetime.combine(obj.date, obj.start_time)
        return dt.isoformat()

    def get_end(self, obj):
        """Combine date and end_time into ISO datetime"""
        from datetime import datetime

        dt = datetime.combine(obj.date, obj.end_time)
        return dt.isoformat()

    def get_extendedProps(self, obj):
        """Additional event data for tooltips/modals"""
        lecturer_name = None
        if obj.course_group.lecturer:
            lecturer_name = f"{obj.course_group.lecturer.user.first_name} {obj.course_group.lecturer.user.last_name}"

        return {
            "courseCode": obj.course_group.course.course_code,
            "courseName": obj.course_group.course.name,
            "room": obj.course_group.room,
            "lecturerName": lecturer_name,
            "groupName": obj.course_group.name,
        }
