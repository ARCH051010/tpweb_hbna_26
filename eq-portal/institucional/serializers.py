from rest_framework import serializers
from .models import Departamento, CentroDesarrollo, MiembroConsejo, MiembroFEU

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'

class CentroSerializer(serializers.ModelSerializer):
    class Meta:
        model = CentroDesarrollo
        fields = '__all__'

class ConsejoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MiembroConsejo
        fields = '__all__'

class FEUSerializer(serializers.ModelSerializer):
    class Meta:
        model = MiembroFEU
        fields = '__all__'