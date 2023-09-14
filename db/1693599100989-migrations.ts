import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1693599100989 implements MigrationInterface {
    name = 'Migrations1693599100989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "link" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
