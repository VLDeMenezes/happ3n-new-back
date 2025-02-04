import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateHubDTO, UpdateHubDTO } from 'src/dto/hub.dto';
import { Hub } from 'src/entities/hub.entities';
import { Repository } from 'typeorm';

@Injectable()
export class HubsService {
  constructor(
    @InjectRepository(Hub)
    private readonly hubRepository: Repository<Hub>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectMetric('HubsCreated')
    private readonly hubsCreatedCounter: Counter<string>,
    @InjectMetric('HubsFetchedById')
    private readonly hubsFetchedByIdCounter: Counter<string>,
  ) {}

  /**
   * Obtiene todos los Hubs disponibles en la base de datos.
   */
  async findAll(): Promise<Hub[]> {
    return this.hubRepository.find();
  }

  /**
   * Busca un hub por ID.
   * @param id Identificador del hub.
   * @throws NotFoundException si no se encuentra el hub.
   */
  async findOne(id: string): Promise<Hub> {
    const hub = await this.hubRepository.findOne({ where: { id } });
    if (!hub) {
      throw new NotFoundException(`Hub with id ${id} not found`);
    }
    this.hubsFetchedByIdCounter.inc(); // Incrementa el contador
    return hub;
  }

  /**
   * Crea un nuevo hub con opción de agregar imágenes.
   * @param body Datos del hub.
   * @param background Imagen background del hub (opcional).
   */
  async create(
    body: CreateHubDTO,
    background?: Express.Multer.File,
  ): Promise<Hub> {
    try {
      const backgroundUrl = background
        ? await this.cloudinaryService.uploadImage(background, 'hubs')
        : null;

      const newHub = this.hubRepository.create({
        ...body,
        background: backgroundUrl,
      });
      this.hubsCreatedCounter.inc(); // Incrementa el contador
      return this.hubRepository.save(newHub);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while creating the hub',
        details: error.message,
      });
    }
  }

  /**
   * Actualiza un hub existente.
   * @param id Identificador del hub.
   * @param body Datos a actualizar.
   * @param background Imagen de fondo (opcional).
   */
  async update(
    id: string,
    body: UpdateHubDTO,
    background?: Express.Multer.File,
  ): Promise<Hub> {
    try {
      const hub = await this.hubRepository.findOne({ where: { id } });
      if (!hub) {
        throw new NotFoundException(`Hub with id ${id} not found`);
      }
      Object.assign(hub, {
        ...body,
        background: background
          ? await this.cloudinaryService.uploadImage(background, 'hubs')
          : hub.background,
      });
      return await this.hubRepository.save(hub);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while updating the hub',
        details: error.message,
      });
    }
  }

  /**
   * Elimina un hub de la base de datos.
   * @param id Identificador del hub.
   * @throws NotFoundException si el hub no existe.
   */
  async remove(id: string): Promise<string> {
    try {
      const hub = await this.hubRepository.findOne({ where: { id } });
      if (hub) {
        await this.hubRepository.remove(hub);
      }
      return 'Hub removed';
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error while removing the hub',
        details: error.message,
      });
    }
  }
}
