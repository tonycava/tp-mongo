export DATABASE_URL=mongodb://tonycava:password@mongo1:27017/hellow?replicaSet=myReplicaSet

build:
	echo "Building the app"
	docker build --no-cache -t mongo-test .
	docker rm -f app
	docker run --network mongoCluster -e PUBLIC_EXTERNAL_API_URL=http://localhost:10000 -e PUBLIC_API_URL=http://app:3000 -e DATABASE_URL=${DATABASE_URL} --name app -p 10000:3000 mongo-test