import { Module } from '@nestjs/common';
import { UsersController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { MetricsModule } from 'src/metrics/metrics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';

@Module({
  imports: [MetricsModule, TypeOrmModule.forFeature([User])],

  controllers: [UsersController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
