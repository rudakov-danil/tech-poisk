ARG APPLY_FIXTURES

FROM python:3.11 AS base

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

VOLUME /usr/src/app/static

FROM base AS apply-fixtures-yes

CMD python manage.py migrate && \
    python manage.py loaddata aggregator/fixtures/sample_data.json && \
    python manage.py collectstatic --noinput && \
    gunicorn techpoisk.wsgi:application --bind 0.0.0.0:8000

FROM base AS apply-fixtures-no

CMD python manage.py migrate && \
    python manage.py collectstatic --noinput && \
    gunicorn techpoisk.wsgi:application --bind 0.0.0.0:8000

FROM apply-fixtures-${APPLY_FIXTURES:-no} AS final
