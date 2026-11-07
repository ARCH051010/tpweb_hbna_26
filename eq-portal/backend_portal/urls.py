from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

# Para poder usar el Token de Simple JWT y la clase que creamos para personalizarlo, importamos la vista de Simple JWT y la clase que creamos para personalizar el Token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from usuarios.serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Configuración para las urls, incluyendo el urls.py de cada app
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/usuarios/', include('usuarios.urls')),
    path('api/noticias/', include('noticias.urls')),
    path('api/estadisticas/', include('stats.urls')),
    path('api/institucional/', include('institucional.urls')),

    # Rutas de Autenticación SIMPLE JWT pero con la ruta personalizada para que use nuestro serializer y así poder enviar el rol del usuario en el token y el nombre de usuario
    # Ruta de acceso y de refresco del Token del usuario y contraseña que se envía
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),

    #Refrescar el token que se está enviando para acceder.
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

# Esto es para que Django deje acceder a los archivos multimedia (imágenes) cuando estamos en modo DEBUG es decir en modo desarrollo, ya que en producción se hace de otra manera
# Le agrega a la lista de urls de Django, la url de los archivos multimedia y le dice que los busque en el directorio MEDIA_ROOT que este es físico
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)