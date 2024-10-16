from rest_framework import serializers
from .models import Student, Teacher, PDFEmbedding
from django.contrib.auth.hashers import make_password
import os


class StudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=False
    )  # Allow password to be optional when saving

    class Meta:
        model = Student
        fields = [
            "name",
            "email",
            "standard",
            "contact_number",
            "parent_email",
            "password",
        ]

    def create(self, validated_data):
        # Hash the password before saving
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])

        return super(StudentSerializer, self).create(validated_data)


class LoginSerializer(serializers.Serializer):  # Not ModelSerializer
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = [
            "id",
            "name",
            "tagline",
            "subject",
            "description",
            "greetings",
            "prompt",
            "assistant_id",
            "vector_store_id",
        ]


class PDFEmbeddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDFEmbedding
        fields = ["file_name", "file", "teacher_id", "vector_store_id"]
