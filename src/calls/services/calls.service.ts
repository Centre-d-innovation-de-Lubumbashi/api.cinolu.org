import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCallDto } from '../dto/create-call.dto';
import { UpdateCallDto } from '../dto/update-call.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Call } from '../entities/call.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CallsService {
  constructor(
    @InjectRepository(Call)
    private callRepository: Repository<Call>
  ) {}

  async create(dto: CreateCallDto): Promise<{ data: Call }> {
    try {
      const data = await this.callRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<{ data: Call[] }> {
    const data = await this.callRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: Call }> {
    try {
      const data = await this.callRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async update(id: string, dto: UpdateCallDto): Promise<{ data: Call }> {
    try {
      const { data: call } = await this.findOne(id);
      await this.callRepository.save({ ...call, ...dto });
      const { data } = await this.findOne(id);
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.callRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }
}
