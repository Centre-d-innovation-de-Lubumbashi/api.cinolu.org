import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>
  ) {}

  async create(dto: CreateTypeDto): Promise<{ data: Type }> {
    try {
      const data = await this.typeRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la création du type');
    }
  }

  async findAll(): Promise<{ data: Type[] }> {
    const data = await this.typeRepository.find();
    return { data };
  }

  async findOne(id: number): Promise<{ data: Type }> {
    try {
      const data = await this.typeRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new NotFoundException('Impossible de récupérer le type');
    }
  }

  async update(id: number, dto: UpdateTypeDto): Promise<{ data: Type }> {
    try {
      const { data: type } = await this.findOne(id);
      const newType = Object.assign(type, dto);
      const data = await this.typeRepository.save(newType);
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la modification du type');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.typeRepository.delete(id);
    } catch {
      throw new BadRequestException('Impossible de supprimer le type');
    }
  }
}
