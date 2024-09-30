<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/kamilkaminski01/django-react-chat-v2/master/frontend/public/favicon-512x512.png" width="100" />
</div>
<h1 align="center">Django React Chat V2</h1>

Fork of the first <a href="https://github.com/kamilkaminski01/django-react-chat">first</a>
version of this project. This version has an enhanced graphical layer and additional
features.

![demo](https://raw.githubusercontent.com/kamilkaminski01/django-react-chat-v2/master/frontend/src/assets/images/demo.png)

## Resources

- [Django](https://www.djangoproject.com/)
- [Django Channels](https://channels.readthedocs.io/en/latest/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [SASS](https://sass-lang.com/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)

### Docker Compose setup

```bash
git clone https://github.com/kamilkaminski01/django-react-chat-v2.git
cd django-react-chat-v2/
make build
make run
```

If `make` is not supported, the associated Docker Compose commands can be used in order
to build and run the project:
```bash
git clone https://github.com/kamilkaminski01/django-react-chat-v2.git
cd django-react-chat-v2/
docker compose build
docker compose up
```
