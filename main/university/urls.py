from rest_framework.routers import DefaultRouter
from .views import FacultyViewSet, PositionViewSet, SemesterViewSet, UniversityMembershipViewSet

router = DefaultRouter()
router.register(r'faculties', FacultyViewSet)
router.register(r'positions', PositionViewSet)
router.register(r'semesters', SemesterViewSet)
router.register(r'memberships', UniversityMembershipViewSet)

urlpatterns = router.urls