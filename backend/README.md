# TechPoisk backend

## Starting a server

To start server with mock data, run commands below:
```
docker compose build --build-arg APPLY_FIXTURES=yes
docker compose up
```

To start server without adding mock data to database, run this command:
```
docker compose up --build
```

If you have already created server with mock data, running second command will not erase it.
To do that you can run:
```
docker compose run -it backend python manage.py flush
```

Make fixtures:
```
python manage.py dumpdata -e auth -e contenttypes -e admin -e sessions -e knox > aggregator/fixtures/sample_data.json
```

## Documentation

To open documentation, click [this link](http://localhost:4001) after running docker

## Miscellanious

Create new mock data from database data:
```
python manage.py dumpdata -e auth -e contenttypes -e admin -e sessions > aggregator/fixtures/sample_data_new.json
```
