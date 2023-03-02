from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserCreateSerializer, UserSerializer, AdminUserCreateSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['is_superuser'] = user.is_superuser
        token['image'] = user.image.url if user.image else None
        
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        
        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status = status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status = status.HTTP_200_OK)
    
class UploadImageView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, format=None):
        data = request.data["image"]
        user = request.user
        user.image = data
        user.save()
        user = UserSerializer(user)
        return Response(user.data, status = status.HTTP_200_OK)
    

class UserDetailsView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request):
        user = User.objects.exclude(is_superuser=True)
        user = UserSerializer(user, many=True)

        return Response(user.data, status = status.HTTP_200_OK)


class UserBlockView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request, user_id):
        user = User.objects.get(id = user_id)
        user.is_active = not user.is_active
        user.save()
        return Response({"message": "success"}, status = status.HTTP_200_OK)


class UserDeleteView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request, user_id):
        user = User.objects.get(id = user_id)
        user.delete()
        return Response({"message": "success"}, status = status.HTTP_200_OK)

class UserCreateView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def post(self, request):
        data = request.data

        serializer = AdminUserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status = status.HTTP_201_CREATED)
    
class UserView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request, user_id):
        user = User.objects.get(id = user_id)
        user = UserSerializer(user)

        return Response(user.data, status = status.HTTP_200_OK)
    
class UserUpdateView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def post(self, request, user_id):
        user = User.objects.get(id = user_id)
        user.username = request.data['username']
        user.email = request.data['email']
        user.save()
        return Response({"message": "success"}, status = status.HTTP_200_OK)



