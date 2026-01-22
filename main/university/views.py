from rest_framework import viewsets
from rest_framework.permissions import SAFE_METHODS, BasePermission
from .models import Faculty, Position, Semester, UniversityMembership
from .serializers import FacultySerializer, PositionSerializer, SemesterSerializer, UniversityMembershipSerializer
from core.permissions import IsStudentReadOnly, IsLecturerOrAdmin, IsAdmin
from rest_framework.pagination import PageNumberPagination


class DefaultPagination(PageNumberPagination):
    page_size = 20


class DenyAll(BasePermission):
    def has_permission(self, request, view):
        return False

class RoleBasedViewSet(viewsets.ModelViewSet):
    pagination_class = DefaultPagination

    def get_permissions(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return [DenyAll()]

        if user.is_staff:
            return [IsAdmin()]

        if hasattr(user, 'student_profile') and self.request.method in SAFE_METHODS:
            return [IsStudentReadOnly()]

        if hasattr(user, 'lecturer_profile'):
            return [IsLecturerOrAdmin()]

        return [DenyAll()]


class FacultyViewSet(RoleBasedViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer


class PositionViewSet(RoleBasedViewSet):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


class SemesterViewSet(RoleBasedViewSet):
    queryset = Semester.objects.select_related('faculty').all()
    serializer_class = SemesterSerializer


class UniversityMembershipViewSet(RoleBasedViewSet):
    queryset = UniversityMembership.objects.all()
    serializer_class = UniversityMembershipSerializer

    def get_queryset(self):
        user = self.request.user
        qs = super().get_queryset()

        if user.is_staff:
            return qs
        if hasattr(user, 'is_student') or hasattr(user, 'is_lecturer'):
            return qs.filter(user=user)
        return qs.none()

