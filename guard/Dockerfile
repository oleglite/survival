FROM python:3.5
ENV PYTHONUNBUFFERED 1
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt
CMD python manage.py runserver