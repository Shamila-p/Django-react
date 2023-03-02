from django.urls import path
from .views import *


urlpatterns = [
    path('register',RegisterView.as_view()),
    path('me', RetrieveUserView.as_view()),
    path('upload_image', UploadImageView.as_view()),
    path('user_details', UserDetailsView.as_view()),
    path('block/<int:user_id>', UserBlockView.as_view()),
    path('delete/<int:user_id>', UserDeleteView.as_view()),
    path('create', UserCreateView.as_view()),
    path('user/<int:user_id>', UserView.as_view()),
    path('update/<int:user_id>', UserUpdateView.as_view()),
]