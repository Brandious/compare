# compare

This system requires two env files which are both located at the roots of their respective folders

You can trigger while in root folder

```sh

    make prepare

```

to create .env files and trigger yarn install for frontend!

Once you populate .env files you can run

```sh

    make all

```

to trigger docker compose and frontend run!

Backend api is behind **http://\<DOMAIN\>:[PORT]/v1**

    ./compare-backend/.env
    ./compare-frontend/.env

.env.frontend

```.env
    VITE_API_URL=<LocalDevUrl>
```

.env.backend

```.env
    PORT = <DatabasePort>
    DATABASE_NAME = <DatabaseName>
    DATABASE_USER = <DatabaseUser>
    DATABASE_PASS = <DatabasePass>
    DATABASE_URI = <DatabaseURI>
```

### Backend stack

```json
        "@nestjs/common": "^10.0.0",
        "@nestjs/config": "^3.2.2",
        "@nestjs/core": "^10.0.0",
        "@nestjs/mongoose": "^10.0.6",
        "@nestjs/platform-express": "^10.0.0",
        "@nestjs/swagger": "^7.3.1",
        "@nestjs/throttler": "^5.1.2",
        "class-transformer": "^0.5.1",
        "class-validator": "^0.14.1",
        "compression": "^1.7.4",
        "helmet": "^7.1.0",
        "mongoose": "^8.4.0",
        "reflect-metadata": "^0.2.0",
        "rxjs": "^7.8.1"
```

### Frontend stack

```json
        "@emotion/react": "^11.11.4",
        "@emotion/styled": "^11.11.5",
        "@mui/icons-material": "^5.15.18",
        "@mui/material": "^5.15.18",
        "@mui/x-date-pickers": "^7.5.1",
        "axios": "^1.7.2",
        "dayjs": "^1.11.11",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-hook-form": "^7.51.5",
        "react-query": "^3.39.3"
```

Initial info is fed by

```js
if (!existsSync(MIGRATION_FLAG_FILE)) {
  await migrationService.dropCollection();

  await migrationService.migrateCities();
  await migrationService.migrateCoverages();
  await migrationService.migrateDiscounts();

  writeFileSync(MIGRATION_FLAG_FILE, "Migration done");
}
```

which would create a MIGRATION_FLAG_FILE which has format of **migration_done.flag**! If data needs to be refreshed just delete this flag file and restart server!

Backend is using **_nestjs_** with **MongoDB** trough dockerized env in dev mode with **Dockerfile** which you can find in backend root...

Frontend leverages **react** and **_vite_** with styling from **_MUI_** and state and caching powered by reacts own **context api** and **Tanstack query**.

```

```
