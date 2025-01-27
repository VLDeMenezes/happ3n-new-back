import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class EventosService {
  constructor(
    @InjectMetric('EventsCreated')
    private readonly eventsCreatedCounter: Counter<string>,
    @InjectMetric('EventsFetchedById')
    private readonly eventsFetchedByIdCounter: Counter<string>,
  ) {}
  findAll() {
    // Aquí iría la lógica para obtener todos los Eventos de la base de datos
    return [];
  }

  findOne(id: string) {
    this.eventsFetchedByIdCounter.inc(); // Incrementa el contador al obtener un Evento por ID
    // Lógica para buscar un canal por ID
    return { id, name: 'Sample Channel' };
  }

  create(data: any) {
    this.eventsCreatedCounter.inc(); // Incrementa el contador al crear un Evento
    // Lógica para crear un Evento
    return { id: 'new-id', ...data };
  }

  update(id: string, data: any) {
    // Lógica para actualizar un Evento
    return { id, ...data };
  }

  remove(id: string) {
    // Lógica para "eliminar" un Evento (por ejemplo, cambiar un flag de visibilidad)
    return { id, visible: false };
  }
}
