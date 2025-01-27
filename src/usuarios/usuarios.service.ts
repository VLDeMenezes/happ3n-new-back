import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectMetric('UsersCreated')
    private readonly usersCreatedCounter: Counter<string>,
    @InjectMetric('UsersFetchedById')
    private readonly usersFetchedByIdCounter: Counter<string>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    this.usersFetchedByIdCounter.inc(); // Incrementa el contador al obtener un usuario por ID
    return this.usersRepository.findOneBy({ id });
  }

  create(data: any) {
    this.usersCreatedCounter.inc(); // Incrementa el contador al crear un usuario
    // Lógica para crear un usuario
    return { id: 'user-id', ...data };
  }

  modify(id: string, data: any) {
    // Lógica para modificar un usuario
    return { id, ...data };
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
