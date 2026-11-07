from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartamentoViewSet, CentroViewSet, ConsejoViewSet, FEUViewSet

router = DefaultRouter()
router.register(r'departamentos', DepartamentoViewSet)
router.register(r'centros', CentroViewSet)
router.register(r'consejo', ConsejoViewSet)
router.register(r'feu', FEUViewSet)

urlpatterns = [
    path('', include(router.urls)),
]