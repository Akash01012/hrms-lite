from django.db.models import Count, Q
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer

class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()

    def get_serializer_class(self):
        return EmployeeSerializer

    def get_queryset(self):
        return Employee.objects.annotate(
            total_present_days=Count(
                "attendance_records",
                filter=Q(attendance_records__status=Attendance.STATUS_PRESENT),
            )
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"message": "Failed to create employee.", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


class EmployeeDeleteView(generics.DestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class AttendanceListCreateView(generics.ListCreateAPIView):
    queryset = Attendance.objects.select_related("employee").all()
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        employee_id = self.request.query_params.get("employee_id")
        date = self.request.query_params.get("date")
        if employee_id:
            queryset = queryset.filter(employee__employee_id=employee_id)
        if date:
            queryset = queryset.filter(date=date)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            attendance = serializer.save()
            read_serializer = self.get_serializer(attendance)
            return Response(read_serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"message": "Failed to mark attendance.", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


class EmployeeAttendanceView(APIView):
    def get(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            return Response(
                {"message": "Employee not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        date = request.query_params.get("date")
        attendance_qs = employee.attendance_records.all()
        if date:
            attendance_qs = attendance_qs.filter(date=date)

        serializer = AttendanceSerializer(attendance_qs, many=True)
        total_present = attendance_qs.filter(status=Attendance.STATUS_PRESENT).count()
        total_absent = attendance_qs.filter(status=Attendance.STATUS_ABSENT).count()

        return Response(
            {
                "employee": EmployeeSerializer(employee).data,
                "attendance": serializer.data,
                "summary": {
                    "total_present": total_present,
                    "total_absent": total_absent,
                },
            },
            status=status.HTTP_200_OK,
        )
