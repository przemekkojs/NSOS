from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('university', '0002_university_universitymembership'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='faculty',
            options={
                'permissions': [
                    ('import_faculty', 'Can import faculties'),
                    ('export_faculty', 'Can export faculties'),
                ],
                'verbose_name': 'Faculty',
                'verbose_name_plural': 'Faculties',
            },
        ),
        migrations.AlterModelOptions(
            name='position',
            options={
                'permissions': [
                    ('import_position', 'Can import positions'),
                    ('export_position', 'Can export positions'),
                ],
                'verbose_name': 'Position',
                'verbose_name_plural': 'Positions',
            },
        ),
        migrations.AlterModelOptions(
            name='semester',
            options={
                'permissions': [
                    ('import_semester', 'Can import semesters'),
                    ('export_semester', 'Can export semesters'),
                ],
                'unique_together': {('faculty', 'academic_year', 'type')},
                'verbose_name': 'Semester',
                'verbose_name_plural': 'Semesters',
            },
        ),
        migrations.AlterModelOptions(
            name='university',
            options={
                'permissions': [
                    ('import_university', 'Can import universities'),
                    ('export_university', 'Can export universities'),
                ],
                'verbose_name': 'University',
                'verbose_name_plural': 'Universities',
            },
        ),
        migrations.AlterModelOptions(
            name='universitymembership',
            options={
                'permissions': [
                    ('import_universitymembership', 'Can import university memberships'),
                    ('export_universitymembership', 'Can export university memberships'),
                ],
                'unique_together': {('user', 'university')},
                'verbose_name': 'University Membership',
                'verbose_name_plural': 'University Memberships',
            },
        ),
    ]
