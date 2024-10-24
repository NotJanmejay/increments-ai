from django.urls import path
from .views import (
    create_student,
    get_students,
    edit_student,
    delete_student,
    delete_teacher,
    create_teacher,
    get_teachers,
    login_student,
    ask_questions,
    upload_pdf,
    edit_teacher,
    clear_memory,
    check_embedding_status,
    list_uploaded_pdfs,
)

urlpatterns = [
    path("students/create/", create_student, name="create_student"),
    path("students/all/", get_students, name="get_students"),
    path("students/login/", login_student, name="login_student"),
    path("students/edit/<str:email>/", edit_student, name="edit_student"),
    path("students/delete/<str:email>/", delete_student, name="delete_student"),
    path("teachers/create/", create_teacher, name="create_teacher"),
    path("teachers/all/", get_teachers, name="get_teachers"),
    path("teachers/delete/<str:id>/", delete_teacher, name="delete_teacher"),
    path("teachers/edit/<str:id>/", edit_teacher, name="edit_teacher"),
    path("students/chat/query/", ask_questions, name="ask_questions"),
    path("students/chat/clear/", clear_memory, name="clear_memory"),
    path("pdf/upload/<int:id>/", upload_pdf, name="upload_pdf"),
    path(
        "check-status/<str:file_name>/",
        check_embedding_status,
        name="check_embedding_status",
    ),
    path("pdfs/all/", list_uploaded_pdfs, name="list_of_uploaded_pdfs"),
]
