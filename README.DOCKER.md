Docker deployment quickstart

1) Build and test locally (optional)

- Build API image:
  docker build -f docker/Dockerfile.api -t karganot-api .
- Build Web image:
  docker build -f docker/Dockerfile.web -t karganot-web .
- Run compose (local):
  DOMAIN=localhost DATABASE_URL="file:./apps/web/prisma/dev.db" docker compose -f docker/docker-compose.prod.yml up --build

2) Deploy to VPS (one-liner)

Replace PASSWORD and HOST accordingly:

PASSWORD='Karganot!2025' HOST='46.252.192.249' USER='karganot' DOMAIN='karganot.com' bash scripts/deploy/deploy-docker-sshpass.sh

3) After deploy: on server
- sudo ln -sf /var/www/karganot/docker/nginx/karganot.conf /etc/nginx/sites-available/karganot.conf
- sudo ln -sf /etc/nginx/sites-available/karganot.conf /etc/nginx/sites-enabled/karganot.conf
- sudo nginx -t && sudo systemctl reload nginx
- sudo certbot --nginx -d karganot.com -d www.karganot.com --non-interactive --agree-tos -m you@youremail.com

