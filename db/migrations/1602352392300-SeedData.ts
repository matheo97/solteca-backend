import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashSync, genSaltSync } from 'bcryptjs';

class SeedData1602352392300 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({ passwordSaltRounds: process.env.PASSWORD_SALT_ROUNDS });
    const salt = genSaltSync(+process.env.PASSWORD_SALT_ROUNDS);
    await queryRunner.query(`INSERT INTO company(id, nit, name, address, self_withholding_url, money_available, is_admin) VALUES ('a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516', '12312', 'Soluciones Tecnicas Aplicadas', 'Calle 10 #1B-41', 'https://www.somewhere.com', '30000000', true)`, undefined);
    await queryRunner.query(`INSERT INTO company_user(id, name, last_name, role_app, role, email, password, phone, picture_url, company_id) VALUES ('b20edbe2-4dc7-4915-abc9-87b7a4b942ae', 'Admin', 'Admin', 'solteca-admin', 'developer', 'admin@gmail.com', '${hashSync('password', salt)}', '3121231212', 'http://somewhere.com', 'a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516')`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM company_user WHERE id='b20edbe2-4dc7-4915-abc9-87b7a4b942ae'`, undefined);
    await queryRunner.query(`DELETE FROM company WHERE id='a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516'`, undefined);
  }
}

export default SeedData1602352392300;
