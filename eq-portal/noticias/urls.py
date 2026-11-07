from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoticiaViewSet, EventoViewSet

# Asignamos en router la instancia de DefaultRouter y luego registramos la url con register, poniendo
# nombre de la url, vista y un name para simplificar la url
router = DefaultRouter()
router.register(r'noticias', NoticiaViewSet, basename='noticias')
router.register(r'eventos', EventoViewSet, basename='eventos')

# Aquí es cuando la url realmente sea hace válida
urlpatterns = [
    path('', include(router.urls)),
]