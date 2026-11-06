from rest_framework import serializers
from .models import Administrador, Editor
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AdministradorSerializer(serializers.ModelSerializer):
    # Obligamos a que el campo password sea requerido y no se muestre al consultar (write_only)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Administrador
        fields = ['username', 'email', 'ci', 'password']

    def create(self, validated_data):
        # Extraemos la contraseña de los datos validados
        password = validated_data.pop('password')
        
        # Creamos la instancia del administrador con la data recibida que ya es validada por Django auto
        admin = Administrador(**validated_data)
        
        # Encriptamos la contraseña 
        admin.set_password(password)
        
        # Le damos permisos de staff y superusuario para que pueda entrar al panel /admin
        admin.is_staff = True
        admin.is_superuser = True 
        
        # Guardamos la info en a la BD
        admin.save()
        return admin

class EditorSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Editor
        fields = ['username', 'email', 'ci', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        editor = Editor(**validated_data)
        editor.set_password(password)
        
        # El editor sí necesita ser staff pero superusuario, él modifica algunas cosas.
        editor.is_staff = True
        editor.is_superuser = False
        
        editor.save()
        return editor

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Agregamos el username al token
        token['username'] = user.username
        
        # Verificamos si es administrador o editor
        if hasattr(user, 'administrador'):
            token['rol'] = 'admin'
        elif hasattr(user, 'editor'):
            token['rol'] = 'editor'
        else:
            token['rol'] = 'desconocido'

        return token