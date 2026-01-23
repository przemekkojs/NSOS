from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group
from .models import Student, Lecturer


@receiver(post_save, sender=Student)
def assign_student_group(sender, instance, created, **kwargs):
    """Automatically assign Student group when a Student profile is created"""
    if created:
        student_group, _ = Group.objects.get_or_create(name='Student')
        instance.user.groups.add(student_group)


@receiver(post_save, sender=Lecturer)
def assign_lecturer_group(sender, instance, created, **kwargs):
    """Automatically assign Lecturer group when a Lecturer profile is created"""
    if created:
        lecturer_group, _ = Group.objects.get_or_create(name='Lecturer')
        instance.user.groups.add(lecturer_group)
