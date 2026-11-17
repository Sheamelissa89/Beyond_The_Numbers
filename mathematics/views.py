from django.shortcuts import render


def index(request):
    return render(request, "mathematics/index.html")


def home(request):
    return render(request, "mathematics/home.html")

def basic_math(request):
    return render(request, "mathematics/basic-math.html")


def fractions(request):
    return render(request, "mathematics/fractions.html")

def patterns(request):
    return render(request, "mathematics/patterns.html")


def geometry(request):
    return render(request, "mathematics/geometry.html")


def probability(request):
    return render(request, "mathematics/probability.html")

def codex(request):
    return render(request, "mathematics/codex.html")
