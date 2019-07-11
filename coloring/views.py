from django.shortcuts import render

def index(request):
    return render(request, 'coloring/index.html')
  
def paint_palette(request):
    return render(request, 'coloring/paint_palette.html')
