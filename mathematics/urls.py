from django.urls import path

from . import views

app_name = "mathematics"

urlpatterns = [
    path("", views.index, name="index"),
    path("home/", views.home, name="home"),
    path("basic-math/", views.basic_math, name="basic_math"),
    path("fractions/", views.fractions, name="fractions"),
    path("codex/", views.codex, name="codex"),
    path("patterns/", views.patterns, name="patterns"),
    path("geometry/", views.geometry, name="geometry"),
    path("probability/", views.probability, name="probability"),
    path("codex/", views.codex, name="codex"),
]