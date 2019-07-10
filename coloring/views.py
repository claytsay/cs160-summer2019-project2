from django.shortcuts import render

def index(request):
    return render(request, 'coloring/index.html')
  
def colour_palette(request):
    return render(request, 'coloring/colour-palette.html')
