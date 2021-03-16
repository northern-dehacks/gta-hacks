from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic import TemplateView

from gtahacks_app import forms


from .num_participants import get_num_participants


def index(request):
    if request.method == 'GET':
        form = forms.ContactForm()
    else:
        form = forms.ContactForm(request.POST)
        if form.is_valid():
            form.send_email()
            return redirect(reverse('success'))

    return render(request, 'index.html', {'form': form, 'num_participants': get_num_participants()})


class Success(TemplateView):
    template_name = 'success.html'
