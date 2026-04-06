from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.moodle_service import get_participants
from .services.moodle_service import get_courses_by_category
# from .services.moodle_service import get_full_category_tree
# from .services.moodle_service import get_programas_con_ciclos

@api_view(['GET'])
def participants_view(request, course_id):
    data = get_participants(request, course_id)
    return Response(data)

@api_view(['GET'])
def courses_by_category_view(request, category_id):
    data = get_courses_by_category(request, category_id)
    return Response(data)

# @api_view(['GET'])
# def category_tree_view(request):
#     data = get_full_category_tree()  # 👈 TODO ocurre dentro del service

#     return Response(data)


# @api_view(['GET'])
# def programas_ciclos_view(request):
#     data = get_programas_con_ciclos()
#     return Response(data)




