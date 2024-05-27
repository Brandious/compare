import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { InitService } from './init/init.service';
import { existsSync, writeFileSync } from 'node:fs';

const PORT = parseInt(process.env.PORT, 10) || 4000;

const MIGRATION_FLAG_FILE = './migration_done.flag';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({}));
  app.enableVersioning({ type: VersioningType.URI });
  app.use(helmet());
  app.use(compression());

  const migrationService = app.get(InitService);

  if (!existsSync(MIGRATION_FLAG_FILE)) {
    await migrationService.dropCollection();

    await migrationService.migrateCities();
    await migrationService.migrateCoverages();
    await migrationService.migrateDiscounts();

    writeFileSync(MIGRATION_FLAG_FILE, 'Migration done');
  }

  await app.listen(PORT, () => {
    console.log(`🚀 Application running at port ${PORT}`);
  });
}
bootstrap();
