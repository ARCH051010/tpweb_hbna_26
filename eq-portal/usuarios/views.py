from django.shortcuts import render
from rest_framework import viewsets

# .directorio significa de la carpeta actual
from .models import Administrador, Editor
from .serializers import AdministradorSerializer, EditorSerializer
from .permissions import IsAdministrador, IsEditor, IsAdminOEditor

# views here.
class AdministradorViewSet(viewsets.ModelViewSet):

    #View que muestra todos los datos de los administradores, es decir la query que se ejecuta para devolver info
    queryset = Administrador.objects.all()

    # Le dice que serializer estaremos usando
    serializer_class = AdministradorSerializer

    # Le decimos a Djanog que para poder acceder a la info debe tener un token, es decir que estén en el sistema y con los privilegios
    permission_classes = [IsAdministrador] 

class EditorViewSet(viewsets.ModelViewSet):
    queryset = Editor.objects.all()
    serializer_class = EditorSerializer
    permission_classes = [IsAdminOEditor] 