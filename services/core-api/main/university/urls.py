from rest_framework.routers import DefaultRouter
from .views import FacultyViewSet, PositionViewSet, SemesterViewSet

router = DefaultRouter()
router.register(r'faculties', FacultyViewSet)
router.register(r'positions', PositionViewSet)
router.register(r'semesters', SemesterViewSet)

urlpatterns = router.urls