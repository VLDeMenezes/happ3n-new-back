import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class HubsService {
  constructor(
    @InjectMetric('HubsCreated')
    private readonly hubsCreatedCounter: Counter<string>,
    @InjectMetric('HubsFetchedById')
    private readonly hubsFetchedByIdCounter: Counter<string>,
  ) {}
  findAll() {
    // Aquí iría la lógica para obtener todos los Hubs de la base de datos
    return [];
  }

  findOne(id: string) {
    this.hubsFetchedByIdCounter.inc(); // Incrementa el contador al obtener un Hub por ID
    // Lógica para buscar un canal por ID
    return { id, name: 'Sample Channel' };
  }

  create(data: any) {
    this.hubsCreatedCounter.inc(); // Incrementa el contador al crear un Hub
    // Lógica para crear un Hub
    return { id: 'new-id', ...data };
  }

  update(id: string, data: any) {
    // Lógica para actualizar un Hub
    return { id, ...data };
  }

  remove(id: string) {
    // Lógica para "eliminar" un Hub (por ejemplo, cambiar un flag de visibilidad)
    return { id, visible: false };
  }
}
