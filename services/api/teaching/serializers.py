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
    """Serializer that formats Class (event) data for FullCalendar"""

    id = serializers.IntegerField()
    title = serializers.SerializerMethodField()
    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()
    extendedProps = serializers.SerializerMethodField()

    def get_title(self, obj):
        # Shows "Course Name - Group Name"
        course_name = obj.course_group.course.name if obj.course_group.course else "Unknown"
        return f"{course_name} ({obj.course_group.name})"

    def get_start(self, obj):
        from datetime import datetime
        # Change 'date' to 'date_held' to match Class model
        dt = datetime.combine(obj.date_held, obj.start_time)
        return dt.isoformat()

    def get_end(self, obj):
        from datetime import datetime
        # Change 'date' to 'date_held' to match Class model
        dt = datetime.combine(obj.date_held, obj.end_time)
        return dt.isoformat()

    def get_extendedProps(self, obj):
        lecturer_name = "Unassigned"
        # Check lecturer on the Class instance first, then fallback to Group
        lecturer = obj.lecturer or obj.course_group.lecturer
        
        if lecturer and lecturer.user:
            lecturer_name = lecturer.user.get_full_name() or f"{lecturer.user.first_name} {lecturer.user.last_name}"

        return {
            "courseName": obj.course_group.course.name if obj.course_group.course else "",
            "room": obj.room or obj.course_group.room,
            "lecturerName": lecturer_name,
            "groupName": obj.course_group.name,
            "status": obj.status
        }