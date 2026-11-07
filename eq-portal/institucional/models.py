from django.db import models

class Departamento(models.Model):
    nombre = models.CharField(max_length=150, unique=True)
    jefe = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class CentroDesarrollo(models.Model):
    nombre = models.CharField(max_length=150, unique=True)
    jefe = models.CharField(max_length=150)
    linea_desarrollo = models.CharField(max_length=200)
    principales_productos = models.TextField()

    def __str__(self):
        return self.nombre

class MiembroConsejo(models.Model):
    nombre = models.CharField(max_length=150)
    correo = models.EmailField()
    cargo = models.CharField(max_length=100)
    foto = models.ImageField(upload_to='consejo/', null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} - {self.cargo}"

class MiembroFEU(models.Model):
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    ano_escolar = models.IntegerField()
    edad = models.IntegerField()
    cargo = models.CharField(max_length=100)
    biografia = models.TextField()

    def __str__(self):
        return f"{self.nombre} {self.apellidos} - {self.cargo}"
