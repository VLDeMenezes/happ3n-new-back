import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelsModule } from './channels/channels.module';
import { HubsModule } from './hubs/hubs.module';
import { EventosModule } from './eventos/eventos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsModule } from './metrics/metrics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Channel } from './entities/channel.entities';
import { User } from './entities/user.entities';
import { Event } from './entities/event.entities';
import { Hub } from './entities/hub.entities';

@Module({
  imports: [
    PrometheusModule.register(),
    ChannelsModule,
    HubsModule,
    EventosModule,
    UsuariosModule,
    MetricsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [Channel, User, Event, Hub],
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // ¡Desactivar en producción
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
