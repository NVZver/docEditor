from django.http import JsonResponse
from django.shortcuts import render, render_to_response

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from editor.models import Document


def editor(request):
    args = {
        'user': request.user,
    }
    return render_to_response('index.html', args)


def get_docs(request):
    docs = []
    for doc in Document.objects.all():
        docs.append({
            "id": doc.id,
            "text": doc.text,
        })
    return JsonResponse({"docs": docs})


@csrf_exempt
def save_docs(request):
    doc = None
    if request.method == 'POST':
        print(request.POST.get('id') is None)
        if request.POST.get('id') is None:
            doc = Document.objects.create(text=request.POST['text'])
        else:
            doc = Document.objects.get(id=request.POST['id'])
            doc.text = request.POST['text']
            doc.save()

    return JsonResponse({"doc": {
        "id": doc.id,
        "text": doc.text
    }})


@csrf_exempt
def delete_docs(request):
    print(request.method)
    if request.method == 'POST':
        print(request.POST['id'])
        if request.POST.get('id') is not None:
            Document.objects.get(id=request.POST['id']).delete()
            return JsonResponse({"status": 200})

    return JsonResponse({"status": 404})
