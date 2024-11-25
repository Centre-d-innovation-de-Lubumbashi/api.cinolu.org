import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { Requirement } from './entities/requirement.entity';
import { CreateRequirementDto, UpdateRequirementDto } from './dto';
import { Rights } from '../../../shared/modules/auth/decorators/rights.decorators';
import { RightsEnum } from '../../../shared/modules/auth/enums/rights.enum';

@Controller('phase-requirements')
@Rights(RightsEnum.Staff)
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Get('')
  @Rights(RightsEnum.Guest)
  findAll(): Promise<{ data: Requirement[] }> {
    return this.requirementsService.findAll();
  }

  @Post('')
  @Rights(RightsEnum.Guest)
  create(@Body() dto: CreateRequirementDto): Promise<{ data: Requirement[] }> {
    return this.requirementsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRequirementDto): Promise<{ data: Requirement }> {
    return this.requirementsService.update(id, dto);
  }

  @Post('restore/:id')
  restore(@Param('id') id: string): Promise<{ data: Requirement }> {
    return this.requirementsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requirementsService.remove(id);
  }
}
