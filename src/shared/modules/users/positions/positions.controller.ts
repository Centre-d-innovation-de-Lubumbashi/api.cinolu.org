import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './entities/position.entity';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Rights } from '../../auth/decorators/rights.decorators';
import { RightsEnum } from '../../auth/enums/rights.enum';

@Controller('postions')
@Rights(RightsEnum.Staff)
export class PositionsController {
  constructor(private readonly PostionsService: PositionsService) {}

  @Post()
  create(@Body() createPostionDto: CreatePositionDto): Promise<{ data: Position }> {
    return this.PostionsService.create(createPostionDto);
  }

  @Get()
  @Rights(RightsEnum.Guest)
  findAll(): Promise<{ data: Position[] }> {
    return this.PostionsService.findAll();
  }

  @Get(':id')
  @Rights(RightsEnum.Guest)
  findOne(@Param('id') id: string): Promise<{ data: Position }> {
    return this.PostionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePositionDto): Promise<{ data: Position }> {
    return this.PostionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.PostionsService.remove(id);
  }
}
