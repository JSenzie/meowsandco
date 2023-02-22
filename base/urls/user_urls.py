from django.urls import path, include
from base.views import user_views as views



urlpatterns = [
    path('', views.getUsers, name='users'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name="user-profile"),
    path('profile/update/', views.updateUserProfile, name="update-user-profile"),  
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),  
]