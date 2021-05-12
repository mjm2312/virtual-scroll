## virtual scroll component
This repo contains code for a table that uses virtual scrolling along the horizontal axis. The client code is written in React and uses the Intersection Observer Web API. The express server delivers csv data to the client along with other static files.

Instructions to run:
- Clone this repo
- Build a Docker image from the root directory: `docker build -t virtual-scroll .`  
- Run the Docker container: `docker run --env PORT=<container_port> -p <host_port>:<container_port> virtual-scroll:latest`. E.g. `docker run --env PORT=3000 -p 3000:3000 virtual-scroll:latest`
  - A note on the run command: the express server will listen at `PORT`. Since we need to publish this port to an available port on the host machine, make sure `PORT`'s value matches the second port in the -p mapping.
- Open `localhost:<host_port>` in your browser (preferably Chrome)
