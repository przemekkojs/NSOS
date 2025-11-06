from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LecturerViewSet, StudentViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'lecturers', LecturerViewSet)
router.register(r'students', StudentViewSet)

urlpatterns = router.urls