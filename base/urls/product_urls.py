from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name="products"),
    path('carousel/', views.getCarouselImages, name='carousel'),
    path('categories/', views.getUniqueCategories, name="categories"),
    path('brands/', views.getUniqueBrands, name="brands"),
    path('sizes/', views.getUniqueSizes, name="sizes"),
    path('<str:pk>/', views.getProduct, name="product"),   
]