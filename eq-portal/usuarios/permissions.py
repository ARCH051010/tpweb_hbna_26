from rest_framework import permissions

class IsAdministrador(permissions.BasePermission):
    """
    Permiso personalizado para permitir el acceso solo a los usuarios
    que pertenecen a la clase Administrador.
    """
    def has_permission(self, request, view):
        # Verifica si el usuario está logueado y si tiene la propiedad administrador, si es correcto da True
        return request.user.is_superuser or hasattr(request.user, 'administrador')

class IsEditor(permissions.BasePermission):
    """
    Permiso personalizado para permitir el acceso solo a los Editores.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, 'editor')

class IsAdminOEditor(permissions.BasePermission):
    """
    Permite el acceso a ambos roles (útil para endpoints donde ambos pueden leer).
    """
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return hasattr(request.user, 'administrador') or hasattr(request.user, 'editor')