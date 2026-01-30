from rest_framework import serializers
from .models import Employee, Attendance
from django.utils import timezone
from django.db import IntegrityError


class EmployeeSerializer(serializers.ModelSerializer):
    total_present_days = serializers.IntegerField(read_only=True)

    class Meta:
        model = Employee
        fields = ["id", "employee_id", "full_name", "email", "department", "created_at", "total_present_days"]

    def validate_employee_id(self, value: str) -> str:
        if not value.strip():
            raise serializers.ValidationError("Employee ID is required.")
        return value

    def validate_full_name(self, value: str) -> str:
        if not value.strip():
            raise serializers.ValidationError("Full name is required.")
        return value

    def validate_department(self, value: str) -> str:
        if not value.strip():
            raise serializers.ValidationError("Department is required.")
        return value


class AttendanceSerializer(serializers.ModelSerializer):
    employee_id = serializers.CharField(write_only=True)
    employee = EmployeeSerializer(read_only=True)

    class Meta:
        model = Attendance
        fields = ["id", "employee", "employee_id", "date", "status", "created_at"]

    def validate_date(self, value):
        if value > timezone.localdate():
            raise serializers.ValidationError("Attendance date cannot be in the future.")
        return value

    def validate_status(self, value: str) -> str:
        value_upper = value.upper()
        if value_upper not in [Attendance.STATUS_PRESENT, Attendance.STATUS_ABSENT]:
            raise serializers.ValidationError("Invalid status. Must be Present or Absent.")
        return value_upper

    def create(self, validated_data):
        employee_id = validated_data.pop("employee_id")
        try:
            employee = Employee.objects.get(employee_id=employee_id)
        except Employee.DoesNotExist:
            raise serializers.ValidationError({"employee_id": "Employee with this ID does not exist."})

        try:
            attendance = Attendance.objects.create(
                employee=employee,
                date=validated_data["date"],
                status=validated_data["status"],
            )
            return attendance

        except IntegrityError:
            raise serializers.ValidationError(
                {
                    "non_field_errors": [
                        "Attendance already marked for this employee on this date."
                    ]
                }
            )
