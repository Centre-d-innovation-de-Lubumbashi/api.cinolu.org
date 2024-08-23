import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsArray()
  recipientIds: number[];

  @IsOptional()
  @IsArray()
  attachmentIds?: number[];

  @IsNotEmpty()
  @IsString()
  senderId: number;
}
