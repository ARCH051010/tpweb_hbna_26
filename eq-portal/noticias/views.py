from rest_framework import viewsets, permissions
from .models import Noticia, Evento
from .serializers import NoticiaSerializer, EventoSerializer
from usuarios.permissions import IsAdminOEditor

class NoticiaViewSet(viewsets.ModelViewSet):
    queryset = Noticia.objects.all()
    serializer_class = NoticiaSerializer

    def get_permissions(self):
        # Si es una petición de lectura (GET), permitir a cualquiera
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        # Si es para crear, editar o borrar, debe ser Admin o Editor
        return [IsAdminOEditor()]

    def perform_create(self, serializer):
        # Asignamos automáticamente al usuario que está haciendo la petición como autor de la noticia
        serializer.save(autor=self.request.user)

class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsAdminOEditor()]

    def perform_create(self, serializer):

        # Asignamos automáticamente al usuario que está haciendo la petición como encargado del evento
        serializer.save(encargado=self.request.user)
