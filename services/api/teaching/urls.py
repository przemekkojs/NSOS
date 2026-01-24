from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet,
    CourseGroupViewSet,
    ClassViewSet,
    ScheduleViewSet,
    UserScheduleView, GradeViewSet,
)
from django.urls import path

router = DefaultRouter()
router.register(r"courses", CourseViewSet)
router.register(r"course-groups", CourseGroupViewSet)
router.register(r"classes", ClassViewSet)
router.register(r"schedules", ScheduleViewSet)
router.register(r'grades', GradeViewSet)

urlpatterns = [
    path("user-schedule/", UserScheduleView.as_view(), name="user-schedule"),
]

urlpatterns += router.urls
