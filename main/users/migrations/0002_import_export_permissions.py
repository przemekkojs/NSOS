from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='lecturer',
            options={
                'permissions': [
                    ('import_lecturer', 'Can import lecturers'),
                    ('export_lecturer', 'Can export lecturers'),
                ],
                'verbose_name': 'Lecturer',
                'verbose_name_plural': 'Lecturers',
            },
        ),
        migrations.AlterModelOptions(
            name='student',
            options={
                'permissions': [
                    ('import_student', 'Can import students'),
                    ('export_student', 'Can export students'),
                ],
                'verbose_name': 'Student',
                'verbose_name_plural': 'Students',
            },
        ),
        migrations.AlterModelOptions(
            name='user',
            options={
                'permissions': [
                    ('import_user', 'Can import users'),
                    ('export_user', 'Can export users'),
                ],
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
            },
        ),
    ]
