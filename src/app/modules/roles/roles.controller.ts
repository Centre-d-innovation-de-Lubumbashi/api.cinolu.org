import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from 'src/app/modules/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/app/modules/auth/enums/role.enum';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('')
  @Roles([RoleEnum.Admin])
  create(@Body() createRoleDto: CreateRoleDto): Promise<{ data: Role }> {
    return this.rolesService.create(createRoleDto);
  }

  @Get('')
  findAll(): Promise<{ data: Role[] }> {
    return this.rolesService.findAll();
  }

  // roles/1
  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Role }> {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<{ data: Role }> {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(+id);
  }
}
