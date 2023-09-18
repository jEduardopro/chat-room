## Live Demo
```
https://chat-room-eduardo.netlify.app
```
Available users to te
-	guest
-	john doe


## Clone project
```
git clone https://github.com/jEduardopro/chat-room.git
```

## Docker Compose (recommended)

Start the project by running the following command
```
docker-compose up --build
```

Go to browser and open the following url
```
http://localhost:5173
```

## NPM

Server App

- Copy the .env.example to .env
- Set the following variables to run api correctly:
```
PORT=
MONGO_URI={DATABASE_URL_HERE}
```

Run the api with the following command
```
npm run dev
```

Client App

Start the app by running the following command
```
npm run dev
```

Go to browser and open the following url
```
http://localhost:5173
```