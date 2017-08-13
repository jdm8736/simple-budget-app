#! /bin/bash
container_name="simple-budget-app"
image_name="simple-budget-app"
docker_run_opts="-d -p 8081:8081 -t"

container_running=$(docker container inspect $container_name -f "{{ .State.Running }}" 2>/dev/null)
echo "Container running: "$container_running

if [ ! "$container_running" == "true" ]; then
  echo "Docker container failed or not started. Running docker container"
  docker run $docker_run_opts --name $container_name $image_name
else
  container_image_sha=`docker container inspect $container_name -f "{{ .Image }}"`
  latest_image_sha=`docker image inspect $image_name -f "{{ .Id }}"`
  if [ ! "$container_image_sha" == "$latest_image_sha" ]; then
    echo "Found mismatch, restarting docker container"
    docker kill $container_name
    docker run $docker_run_opts --name $container_name $image_name
  fi
fi
