# -*- coding: utf-8 -*-

import json

from django.contrib import auth
from django.contrib.auth.forms import AuthenticationForm
from django.http.response import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt


HTTP_400_BAD_REQUEST = 400
HTTP_401_UNAUTHORIZED = 401


def add_cors(view):
    @csrf_exempt
    def wrapper(*args, **kwargs):
        response = view(*args, **kwargs)
        response['Access-Control-Allow-Origin'] = '*'
        return response
    return wrapper


@add_cors
@require_http_methods(['POST'])
def login(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
    except ValueError:
        return JsonResponse({'status': 'error'}, status=HTTP_400_BAD_REQUEST)

    form = AuthenticationForm(request, data)
    if not form.is_valid():
        return JsonResponse({'status': 'error'}, status=HTTP_400_BAD_REQUEST)

    user = form.get_user()
    if user is not None:
        auth.login(request, user)
        user
    else:
        return JsonResponse({'status': 'error'}, status=HTTP_400_BAD_REQUEST)
    return JsonResponse({'status': 'ok'})


@add_cors
@require_http_methods(['POST'])
def logout(request):
    auth.logout(request)
    return JsonResponse({'status': 'ok'})
