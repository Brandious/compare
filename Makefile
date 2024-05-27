prepare: 
	 if [ ! -f ./compare-backend/.env ]; then \
        touch ./compare-backend/.env; \
        echo "PORT=\n" >> ./compare-backend/.env; \
        echo "DATABASE_NAME=\n" >> ./compare-backend/.env; \
        echo "DATABASE_USER=\n" >> ./compare-backend/.env; \
        echo "DATABASE_PASS=\n" >> ./compare-backend/.env; \
        echo "DATABASE_URI=\n" >> ./compare-backend/.env; \
    fi
    
	
	if [ ! -f ./compare-frontend/.env ]; then \
        touch ./compare-frontend/.env; \
        echo "VITE_API_URL=\n" >> ./compare-frontend/.env; \
    fi 

	cd ./compare-frontend && yarn install && cd ../ \
	cd ./compare-backend && yarn install
	
	

up:
	docker-compose -f ./compare-backend/docker-compose.yaml up -d
dev:
	cd ./compare-frontend && yarn dev

all: up dev