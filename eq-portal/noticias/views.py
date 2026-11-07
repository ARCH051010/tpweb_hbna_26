from rest_framework import viewsets, permissions
from .models import Noticia, Evento
from .serializers import NoticiaSerializer, EventoSerializer
from usuarios.permissions import IsAdminOEditor
from django.db.models import Count
from django.db.models.functions import TruncMonth
from rest_framework.views import APIView
from rest_framework.response import Response

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

# Vista para las estadisticas
class EstadisticasView(APIView):
    # Solo admins y editores pueden ver las estadísticas
    permission_classes = [IsAdminOEditor] 

    def get(self, request):
        # Datos para las tarjetas
        total_noticias = Noticia.objects.count()
        total_eventos = Evento.objects.count()

        # Datos para el Gráfico de Líneas (Noticias por Mes)
        # Agrupa por mes y cuenta
        noticias_por_mes = Noticia.objects.annotate(
            mes=TruncMonth('fecha')
        ).values('mes').annotate(total=Count('id')).order_by('mes')

        # Formateamos los meses para que React los entienda fácil
        datos_meses = [
            {"mes": item['mes'].strftime('%b %Y') if item['mes'] else 'N/A', "total": item['total']} 
            for item in noticias_por_mes
        ]

        return Response({
            'kpis': {
                'total_noticias': total_noticias,
                'total_eventos': total_eventos,
            },
            'noticias_por_mes': datos_meses
        })