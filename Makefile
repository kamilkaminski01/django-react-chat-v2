.PHONY: build run recreate lint check frontcheck isort black flake8 mypy prod clear

ifeq ($(env),prod)
	COMPOSE_FILE=docker-compose-prod.yml
else
	COMPOSE_FILE=docker-compose.yml
endif

build:
	docker compose build

run:
	docker compose up

recreate:
	docker compose up --build --force-recreate

lint:
	docker compose run --rm -T web isort .
	docker compose run --rm -T web black .
	docker compose run --rm -T web flake8 .
	docker compose run --rm -T web mypy .

check:
	docker compose run --rm web isort --check-only .
	docker compose run --rm web black --check .
	docker compose run --rm web flake8 .
	docker compose run --rm web mypy .

frontcheck:
	docker compose run --rm -T frontend npm run check

isort:
	docker compose run --rm -T web isort .

black:
	docker compose run --rm -T web black .

flake8:
	docker compose run --rm -T web flake8 .

mypy:
	docker compose run --rm -T web mypy .

prod:
	docker compose -f docker-compose-prod.yml up -d

clear:
	docker compose -f $(COMPOSE_FILE) down -v
	docker images -aq | xargs -r docker rmi
