from django.urls import path
from .views import participants_view
from .views import courses_by_category_view
# from .views import category_tree_view
# from .views import programas_ciclos_view

urlpatterns = [
    path('participants/<int:course_id>/', participants_view),
    path('courses/<int:category_id>/', courses_by_category_view),
    
    # path('structure/', category_tree_view),
    # path('programas-ciclos/', programas_ciclos_view),
]