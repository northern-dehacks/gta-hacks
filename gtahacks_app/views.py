from django.http import HttpResponse
from django.shortcuts import render

from gtahacks_app import forms


from gtahacks_app.num_participants import get_num_participants


def index(request):
    if request.method == 'GET':
        form = forms.ContactForm()
    else:
        form = forms.ContactForm(request.POST)
        if form.is_valid():
            form.send_email()

    return render(request, 'index.html', {'form': form, 'num_participants': get_num_participants()})
