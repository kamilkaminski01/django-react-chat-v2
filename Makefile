# Set the COMPOSE_FILE variable to the appropriate file based on the environment
# without env for development
# env=prod for production

ifeq ($(env),prod)
	COMPOSE_FILE=docker-compose-prod.yml
else
	COMPOSE_FILE=docker-compose.yml
endif

.PHONY: build run down recreate lint check frontcheck isort black flake8 mypy prod clear

REGISTRY = kamil01/django-react-chat-v2

build:
	docker compose -f $(COMPOSE_FILE) build

run:
	docker compose -f $(COMPOSE_FILE) up $(if $(filter prod,$(env)),-d)

down:
	docker compose -f $(COMPOSE_FILE) down

recreate:
	docker compose -f $(COMPOSE_FILE) up --build --force-recreate $(if $(filter prod,$(env)),-d)

lint:
	docker compose -f $(COMPOSE_FILE) run --rm -T web isort .
	docker compose -f $(COMPOSE_FILE) run --rm -T web black .
	docker compose -f $(COMPOSE_FILE) run --rm -T web flake8 .
	docker compose -f $(COMPOSE_FILE) run --rm -T web mypy .

check:
	docker compose -f $(COMPOSE_FILE) run --rm web isort --check-only .
	docker compose -f $(COMPOSE_FILE) run --rm web black --check .
	docker compose -f $(COMPOSE_FILE) run --rm web flake8 .
	docker compose -f $(COMPOSE_FILE) run --rm web mypy .

frontcheck:
	docker compose -f $(COMPOSE_FILE) run --rm -T frontend npm run check

isort:
	docker compose -f $(COMPOSE_FILE) run --rm -T web isort .

black:
	docker compose -f $(COMPOSE_FILE) run --rm -T web black .

flake8:
	docker compose -f $(COMPOSE_FILE) run --rm -T web flake8 .

mypy:
	docker compose -f $(COMPOSE_FILE) run --rm -T web mypy .

prod:
	docker compose -f docker-compose-prod.yml up -d

clear:
	docker compose -f $(COMPOSE_FILE) down -v
	docker images -q $(REGISTRY) | xargs -r docker rmi
