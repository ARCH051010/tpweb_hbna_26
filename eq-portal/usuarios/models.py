from django.db import models

# models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

# La clase usuario hereda de AbstractUser que incluye username, password, email, first_name, last_name, etc.
# Agregamos ci porque será la clave primaria y no viene por defecto
class Usuario(AbstractUser):
    # Hay que decirle a Django que no use la llave primaria por defecto
    id = None 
    
    ci = models.CharField(max_length=11, primary_key=True, unique=True, verbose_name="Carnet de Identidad")

    def __str__(self):
        return f"{self.ci} - {self.first_name} {self.last_name}"

# La clase administrador hereda de Usuario
class Administrador(Usuario):
    class Meta:
        verbose_name = "Administrador"
        verbose_name_plural = "Administradores"

# La clase editor hereda de Usuario
class Editor(Usuario):
    class Meta:
        verbose_name = "Editor"
        verbose_name_plural = "Editores"