import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partnership } from './entities/partnership.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnershipsService {
  constructor(
    @InjectRepository(Partnership)
    private partnershipsRepository: Repository<Partnership>
  ) {}

  async create(dto: CreatePartnershipDto): Promise<{ data: Partnership }> {
    try {
      const data = await this.partnershipsRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<{ data: Partnership[] }> {
    try {
      const data = await this.partnershipsRepository.find();
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findOne(id: string): Promise<{ data: Partnership }> {
    try {
      const data = await this.partnershipsRepository.findOneOrFail({ where: { id } });
      return { data };
    } catch {
      throw new NotFoundException("Le type de partenariat n'existe pas");
    }
  }

  async update(id: string, dto: UpdatePartnershipDto) {
    try {
      const { data: Partnership } = await this.findOne(id);
      const data = await this.partnershipsRepository.save({ ...Partnership, ...dto });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.partnershipsRepository.delete(id);
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }
}
