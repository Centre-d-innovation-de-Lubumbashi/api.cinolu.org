import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsArray()
  recipientIds?: number[];

  @IsOptional()
  @IsArray()
  attachmentIds?: number[];
}
