from django.shortcuts import render, render_to_response


# Create your views here.
from editor.models import Document


def editor(request):
    args = {
        'user': request.user,
        'docs': Document.objects.all()
    }

    if request.method == 'POST':
        Document.objects.create()

    args['docs'] = Document.objects.all()
    return render_to_response('index.html', args)