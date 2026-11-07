from django.utils import timezone
from django.db.models import Count
from django.db.models.functions import TruncMonth
from rest_framework.views import APIView
from rest_framework.response import Response

# Importamos los permisos y los modelos de las OTRAS apps
from usuarios.permissions import IsAdminOEditor 
from usuarios.models import Usuario, Editor, Administrador
from noticias.models import Noticia, Evento
from noticias.serializers import EventoSerializer

class EstadisticasView(APIView):
    permission_classes = [IsAdminOEditor] 

    def get(self, request):
        # 1. KPIs Generales
        total_noticias = Noticia.objects.count()
        total_eventos = Evento.objects.count()
        total_usuarios = Usuario.objects.count()
        total_editores = Editor.objects.count()
        total_admins = Administrador.objects.count()

        # 2. Datos para gráficos de Noticias
        noticias_por_autor = Noticia.objects.values('autor__username').annotate(
            total=Count('id')
        ).order_by('-total')

        noticias_por_mes = Noticia.objects.annotate(
            mes=TruncMonth('fecha')
        ).values('mes').annotate(total=Count('id')).order_by('mes')

        datos_meses = [
            {"mes": item['mes'].strftime('%b %Y') if item['mes'] else 'N/A', "total": item['total']} 
            for item in noticias_por_mes
        ]

        # 3. Datos para gráficos de Usuarios
        datos_usuarios_pastel = [
            {"name": "Editores", "value": total_editores},
            {"name": "Administradores", "value": total_admins}
        ]

        # 4. Próximos eventos
        proximos_eventos = Evento.objects.filter(
            fecha_evento__gte=timezone.now().date()
        ).order_by('fecha_evento')[:4]

        # 5. Retornamos todo junto
        return Response({
            'kpis': {
                'total_noticias': total_noticias,
                'total_eventos': total_eventos,
                'total_usuarios': total_usuarios,
                'total_editores': total_editores,
                'total_admins': total_admins,
            },
            'noticias_por_autor': list(noticias_por_autor),
            'noticias_por_mes': datos_meses,
            'usuarios_pastel': datos_usuarios_pastel,
            'proximos_eventos': EventoSerializer(proximos_eventos, many=True).data
        })