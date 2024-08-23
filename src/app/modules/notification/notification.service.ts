import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notifications.entity';
import { NotificationRecipients } from './entities/notificationRecipients.entity';
import { User } from '../users/entities/user.entity';
import { Attachment } from '../attachments/entities/attachment.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    @InjectRepository(NotificationRecipients)
    private readonly notificationRecipientsRepository: Repository<NotificationRecipients>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const { title, message, recipientIds, attachmentIds, senderId } = createNotificationDto;

    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }

    const attachments = attachmentIds ? await this.attachmentRepository.findByIds(attachmentIds) : [];

    const notification = this.notificationRepository.create({
      title,
      message,
      sender,
      attachments
    });

    await this.notificationRepository.save(notification);

    for (const recipientId of recipientIds) {
      const recipientUser = await this.userRepository.findOne({ where: { id: recipientId } });
      const recipientRole = await this.roleRepository.findOne({ where: { id: recipientId } });

      if (recipientUser) {
        const recipient = this.notificationRecipientsRepository.create({
          notification,
          user: recipientUser
        });
        await this.notificationRecipientsRepository.save(recipient);
      } else if (recipientRole) {
        const recipient = this.notificationRecipientsRepository.create({
          notification,
          role: recipientRole
        });
        await this.notificationRecipientsRepository.save(recipient);
      }
    }

    return notification;
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({ relations: ['sender', 'recipients', 'attachments'] });
  }

  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
      relations: ['sender', 'recipients', 'attachments']
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const notification = await this.findOne(id);

    const updatedNotification = this.notificationRepository.merge(notification, updateNotificationDto);
    return this.notificationRepository.save(updatedNotification);
  }

  async remove(id: number): Promise<void> {
    const notification = await this.findOne(id);
    await this.notificationRepository.remove(notification);
  }
}
