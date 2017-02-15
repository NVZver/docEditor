from django.http import JsonResponse
from django.shortcuts import render, render_to_response


# Create your views here.
from editor.models import Document


def editor(request):
    args = {
        'user': request.user,
    }
    return render_to_response('index.html', args)


def get_docs(request):
    print('test')
    data = []
    data = Document.objects.all()
    print(data)
    return JsonResponse({"data": data})

def create_doc(request):
    print('create')