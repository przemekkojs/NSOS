from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, CourseGroupViewSet, ClassViewSet, ScheduleViewSet

router = DefaultRouter()
router.register(r"courses", CourseViewSet)
router.register(r"course-groups", CourseGroupViewSet)
router.register(r"classes", ClassViewSet)
router.register(r"schedules", ScheduleViewSet)

urlpatterns = router.urls
