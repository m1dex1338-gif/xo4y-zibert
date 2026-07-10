#!/opt/alt/python311/bin/python3
import os
import sys

# Додаємо шлях до нашого проекту бекенду та віртуального оточення
sys.path.insert(0, '/var/www/ch15abc6a5/ngs')
sys.path.insert(0, '/var/www/ch15abc6a5/www/gns-furniture.com.ua/venv/lib/python3.11/site-packages')

# Встановлюємо модуль налаштувань
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vdm_backend.settings')

# Запускаємо через вбудований CGIHandler
from django.core.wsgi import get_wsgi_application
from wsgiref.handlers import CGIHandler

application = get_wsgi_application()
CGIHandler().run(application)
