from rest_framework import viewsets, permissions
from .models import Departamento, CentroDesarrollo, MiembroConsejo, MiembroFEU
from .serializers import DepartamentoSerializer, CentroSerializer, ConsejoSerializer, FEUSerializer

class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer

class CentroViewSet(viewsets.ModelViewSet):
    queryset = CentroDesarrollo.objects.all()
    serializer_class = CentroSerializer

class ConsejoViewSet(viewsets.ModelViewSet):
    queryset = MiembroConsejo.objects.all()
    serializer_class = ConsejoSerializer

class FEUViewSet(viewsets.ModelViewSet):
    queryset = MiembroFEU.objects.all()
    serializer_class = FEUSerializer
