import { Module } from '@nestjs/common';
import {
  PrometheusModule,
  makeCounterProvider,
} from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics', // Ruta global para las métricas
      defaultMetrics: {
        enabled: false,
      },
    }),
  ],
  providers: [
    // Contadores personalizados para cada entidad
    makeCounterProvider({
      name: 'UsersCreated',
      help: 'Número de usuarios creados',
    }),
    makeCounterProvider({
      name: 'ChannelsCreated',
      help: 'Número de canales creados',
    }),
    makeCounterProvider({
      name: 'EventsCreated',
      help: 'Número de eventos creados',
    }),
    makeCounterProvider({
      name: 'HubsCreated',
      help: 'Número de hubs creados',
    }),

    // Contadores para el número de peticiones por ID
    makeCounterProvider({
      name: 'UsersFetchedById',
      help: 'Número de peticiones para obtener usuarios por ID',
    }),
    makeCounterProvider({
      name: 'ChannelsFetchedById',
      help: 'Número de peticiones para obtener canales por ID',
    }),
    makeCounterProvider({
      name: 'EventsFetchedById',
      help: 'Número de peticiones para obtener eventos por ID',
    }),
    makeCounterProvider({
      name: 'HubsFetchedById',
      help: 'Número de peticiones para obtener hubs por ID',
    }),
  ],
  exports: [
    // Exportamos los contadores para que estén disponibles en otros módulos
    PrometheusModule,
    makeCounterProvider({ name: 'UsersCreated', help: '' }),
    makeCounterProvider({ name: 'ChannelsCreated', help: '' }),
    makeCounterProvider({ name: 'EventsCreated', help: '' }),
    makeCounterProvider({ name: 'HubsCreated', help: '' }),
    makeCounterProvider({ name: 'UsersFetchedById', help: '' }),
    makeCounterProvider({ name: 'ChannelsFetchedById', help: '' }),
    makeCounterProvider({ name: 'EventsFetchedById', help: '' }),
    makeCounterProvider({ name: 'HubsFetchedById', help: '' }),
  ],
})
export class MetricsModule {}
