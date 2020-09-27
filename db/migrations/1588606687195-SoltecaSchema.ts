import { MigrationInterface, QueryRunner } from 'typeorm';

class SoltecaSchema1588606687195 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`, undefined);
    await queryRunner.query(`CREATE TYPE user_role AS ENUM ('solteca-admin', 'accountant', 'solteca-user')`, undefined);
    
    await queryRunner.query(`CREATE TABLE company (
      id uuid DEFAULT uuid_generate_v4() NOT NULL,
      nit character varying(255) NOT NULL,
      name character varying(255) NOT NULL,
      address character varying(255),
      self_withholding_url character varying(255),
      money_available character varying(255),
      money_available_updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
      created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY company ADD CONSTRAINT company_pkey PRIMARY KEY (id)`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY company ADD CONSTRAINT company_nit_unique UNIQUE (nit)`, undefined);
    
    await queryRunner.query(`CREATE TABLE company_user (
      id uuid DEFAULT uuid_generate_v4() NOT NULL,
      name character varying(255) NOT NULL,
      last_name character varying(255) NOT NULL,
      role_app user_role NOT NULL,
      role character varying(255),
      email character varying(255),
      password character varying(100),
      phone character varying(15),
      picture_url character varying(255),
      company_id uuid NOT NULL,
      created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY company_user ADD CONSTRAINT user_pkey PRIMARY KEY (id)`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY company_user ADD CONSTRAINT user_email_unique UNIQUE (email)`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY company_user ADD CONSTRAINT company_user_id_foreign FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE`, undefined);
    
    await queryRunner.query(`CREATE TABLE bill (
      id uuid DEFAULT uuid_generate_v4() NOT NULL,
      bill_no character varying(255) NOT NULL,
      company_id uuid NOT NULL,
      related_company_id uuid NOT NULL,
      total double precision,
      total_iva double precision,
      other_expenses double precision,
      is_paid boolean DEFAULT false,
      is_quote boolean DEFAULT false,
      is_sells_receipt boolean DEFAULT true,
      created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY bill ADD CONSTRAINT bill_pkey PRIMARY KEY (id)`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY bill ADD CONSTRAINT bill_bill_no_unique UNIQUE (bill_no)`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY bill ADD CONSTRAINT company_bill_company_id_foreign FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY bill ADD CONSTRAINT company_bill_related_company_id_foreign FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE`, undefined);
    
    await queryRunner.query(`CREATE TABLE bill_item (
      id uuid DEFAULT uuid_generate_v4() NOT NULL,
      bill_id uuid NOT NULL,
      quantity integer DEFAULT 1 NOT NULL,
      product_name character varying(255) NOT NULL,
      details character varying(255),
      total double precision,
      created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY bill_item ADD CONSTRAINT bill_item_pkey PRIMARY KEY (id)`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY bill_item ADD CONSTRAINT bill_item_bill_id_foreign FOREIGN KEY (bill_id) REFERENCES bill(id) ON DELETE CASCADE`, undefined);

    await queryRunner.query(`CREATE TABLE file (
      id uuid DEFAULT uuid_generate_v4() NOT NULL,
      company_id uuid NOT NULL,
      name character varying(255) NOT NULL,
      file_url character varying(255) NOT NULL,
      created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY file ADD CONSTRAINT file_pkey PRIMARY KEY (id)`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY file ADD CONSTRAINT file_company_id_foreign FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE ONLY file DROP CONSTRAINT file_company_id_foreign`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY file DROP CONSTRAINT file_pkey`, undefined);

    await queryRunner.query(`ALTER TABLE ONLY bill_item DROP CONSTRAINT bill_item_bill_id_foreign`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY bill_item DROP CONSTRAINT bill_item_pkey`, undefined);

    await queryRunner.query(`ALTER TABLE ONLY bill DROP CONSTRAINT company_bill_related_company_id_foreign`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY bill DROP CONSTRAINT company_bill_company_id_foreign`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY bill DROP CONSTRAINT bill_bill_no_unique`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY bill DROP CONSTRAINT bill_pkey`, undefined);

    await queryRunner.query(`ALTER TABLE ONLY company_user DROP CONSTRAINT company_user_id_foreign`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY company_user DROP CONSTRAINT user_email_unique`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY company_user DROP CONSTRAINT user_pkey`, undefined);

    await queryRunner.query(`ALTER TABLE ONLY company DROP CONSTRAINT company_nit_unique`, undefined);
    await queryRunner.query(`ALTER TABLE ONLY company DROP CONSTRAINT company_pkey`, undefined);

    await queryRunner.query(`DROP TABLE "file"`, undefined);
    await queryRunner.query(`DROP TABLE "bill_item"`, undefined);
    await queryRunner.query(`DROP TABLE "bill"`, undefined);
    await queryRunner.query(`DROP TABLE "company_user"`, undefined);
    await queryRunner.query(`DROP TABLE "company"`, undefined);

    await queryRunner.query(`DROP TYPE "shipments_types"`, undefined);
  }
}

export default SoltecaSchema1588606687195;
