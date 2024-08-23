import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1724403984825 implements MigrationInterface {
  name = ' $npmConfigName1724403984825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`notification_recipients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_read\` tinyint NOT NULL DEFAULT 0, \`notificationId\` int NULL, \`userId\` int NULL, \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`message\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`sender_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(`ALTER TABLE \`attachment\` ADD \`notificationId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` ADD CONSTRAINT \`FK_234adaa36f97dd1b2bd3a22d65b\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` ADD CONSTRAINT \`FK_452385a8220b8053ab65317ffa6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` ADD CONSTRAINT \`FK_3852dc04e40c1ebb8ec68d9a050\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_56023c91b76b36125acd4dcd9c5\` FOREIGN KEY (\`sender_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_e90685adc595f3feeec766456a8\` FOREIGN KEY (\`notificationId\`) REFERENCES \`notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_e90685adc595f3feeec766456a8\``);
    await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_56023c91b76b36125acd4dcd9c5\``);
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` DROP FOREIGN KEY \`FK_3852dc04e40c1ebb8ec68d9a050\``
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` DROP FOREIGN KEY \`FK_452385a8220b8053ab65317ffa6\``
    );
    await queryRunner.query(
      `ALTER TABLE \`notification_recipients\` DROP FOREIGN KEY \`FK_234adaa36f97dd1b2bd3a22d65b\``
    );
    await queryRunner.query(`ALTER TABLE \`attachment\` DROP COLUMN \`notificationId\``);
    await queryRunner.query(`DROP TABLE \`notification\``);
    await queryRunner.query(`DROP TABLE \`notification_recipients\``);
  }
}
