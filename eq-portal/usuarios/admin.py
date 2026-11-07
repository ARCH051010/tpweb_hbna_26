from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Administrador, Editor

# Registramos el Usuario base usando UserAdmin
@admin.register(Usuario)

# Hereda de UserAdmin para personalizar la vista de administración del modelo Usuario 
# Y para poder usar la seguridad de Django para el login y las contraseñas
class UsuarioAdmin(UserAdmin):
    # Agregamos nuestro campo personalizado 'ci' a los formularios de edición
    fieldsets = UserAdmin.fieldsets + (
        ('Información Adicional', {'fields': ('ci',)}),
    )
    # Agregamos 'ci' al formulario de creación de nuevos usuarios, para que reconozca el campo CI
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Información Adicional', {'fields': ('ci',)}),
    )
    
    # Qué columnas mostrar en la tabla de la lista, para que muestre el campo CI
    list_display = ('username', 'ci', 'email', 'first_name', 'last_name', 'is_staff')

# 2. Registramos al Administrador
@admin.register(Administrador)
class AdministradorAdmin(admin.ModelAdmin):
    # Mostramos los campos heredados de Usuario y los propios
    list_display = ('username', 'ci', 'email', 'is_staff', 'is_superuser')
    search_fields = ('username', 'ci', 'email')

# 3. Registramos al Editor
@admin.register(Editor)
class EditorAdmin(admin.ModelAdmin):
    list_display = ('username', 'ci', 'email', 'is_staff')
    search_fields = ('username', 'ci', 'email')