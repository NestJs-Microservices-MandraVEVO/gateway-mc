<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Nats
´´´
docker un -d --name nats-server -p 4222:4222 -p 8222:8222 nats
´´´

## PROD
Ejecutar 
´´´
docker run -d -p 3000:3000 -e PORT=3000 -e NATS_SERVERS=nats://nats:4222 --name client-gateway-prod2 client-gateway  
´´´ 