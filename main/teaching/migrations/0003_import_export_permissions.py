from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('teaching', '0002_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='class',
            options={
                'permissions': [
                    ('import_class', 'Can import classes'),
                    ('export_class', 'Can export classes'),
                ],
                'verbose_name': 'Class',
                'verbose_name_plural': 'Classes',
            },
        ),
        migrations.AlterModelOptions(
            name='course',
            options={
                'permissions': [
                    ('import_course', 'Can import courses'),
                    ('export_course', 'Can export courses'),
                ],
                'verbose_name': 'Course',
                'verbose_name_plural': 'Courses',
            },
        ),
        migrations.AlterModelOptions(
            name='coursegroup',
            options={
                'permissions': [
                    ('import_coursegroup', 'Can import course groups'),
                    ('export_coursegroup', 'Can export course groups'),
                ],
                'verbose_name': 'Course Group',
                'verbose_name_plural': 'Course Groups',
            },
        ),
        migrations.AlterModelOptions(
            name='schedule',
            options={
                'permissions': [
                    ('import_schedule', 'Can import schedules'),
                    ('export_schedule', 'Can export schedules'),
                ],
                'verbose_name': 'Schedule',
                'verbose_name_plural': 'Schedules',
            },
        ),
    ]
