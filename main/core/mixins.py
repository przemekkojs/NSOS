from django.db import transaction
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response


IMPORT_EXPORT_ACTIONS = {"import_data", "export_data"}


class AdminImportExportMixin:
    def _require_model_permission(self, request, action_prefix: str):
        model = self.get_queryset().model
        opts = model._meta
        codename = f"{opts.app_label}.{action_prefix}_{opts.model_name}"
        if not request.user or not request.user.has_perm(codename):
            raise PermissionDenied(f"Missing permission: {codename}")

    @action(detail=False, methods=["get"], url_path="export")
    def export_data(self, request):
        self._require_model_permission(request, "export")
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["post"], url_path="import")
    def import_data(self, request):
        self._require_model_permission(request, "import")
        payload = request.data
        if not isinstance(payload, (list, tuple)):
            payload = [payload]

        results = []
        with transaction.atomic():
            for item in payload:
                instance = None
                data = item
                if isinstance(item, dict):
                    pk = item.get("id")
                    instance = self.get_queryset().filter(pk=pk).first() if pk else None
                    data = {k: v for k, v in item.items() if k != "id"}

                serializer = self.get_serializer(instance=instance, data=data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                results.append(serializer.data)

        return Response(results, status=status.HTTP_201_CREATED)
