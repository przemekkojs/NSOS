from django.core.management.base import BaseCommand
from django.contrib.auth.models import Permission


class Command(BaseCommand):
    help = "Exports all permission codenames to a TypeScript file"

    def handle(self, *args, **options):
        # Fetch all unique permissions from the DB
        # Or filter by your specific apps to keep the file clean
        permissions = list(
            Permission.objects.values_list("codename", flat=True).order_by("codename")
        )

        # Convert to a TypeScript Union Type
        ts_content = (
            "export type AppPermission = \n  | "
            + "\n  | ".join([f"'{p}'" for p in permissions])
            + ";"
        )

        with open("../frontend/types/permissions.d.ts", "w") as f:
            f.write(ts_content)

        self.stdout.write(self.style.SUCCESS("Successfully exported permissions"))
