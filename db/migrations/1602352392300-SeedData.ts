import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashSync, genSaltSync } from 'bcryptjs';

class SeedData1602352392300 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({ passwordSaltRounds: process.env.PASSWORD_SALT_ROUNDS });
    const salt = genSaltSync(+process.env.PASSWORD_SALT_ROUNDS);
    await queryRunner.query(`INSERT INTO company(id, nit, name, address, self_withholding_url, money_available, is_admin) VALUES ('a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516', '12312', 'Soluciones Tecnicas Aplicadas', 'Calle 10 #1B-41', 'https://www.somewhere.com', '30000000', true)`, undefined);
    await queryRunner.query(`INSERT INTO company_user(id, name, last_name, role_app, role, email, password, phone, picture_url, company_id) VALUES ('b20edbe2-4dc7-4915-abc9-87b7a4b942ae', 'Admin', 'Admin', 'solteca-admin', 'developer', 'admin@gmail.com', '${hashSync('password', salt)}', '3121231212', 'http://somewhere.com', 'a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516')`, undefined);
    await queryRunner.query(`INSERT INTO bill(id, bill_no, company_id, related_company_id, total, total_iva, other_expenses, is_paid, is_quote, is_sale_receipt, created_at) VALUES ('586a4d12-6deb-47df-a108-b38e8dfc7c1e', '1', 'a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516', 'a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516', 100, 50, 0, true, false, true, '2020-02-10 14:00:49.061184-05')`, undefined);
    await queryRunner.query(`INSERT INTO bill(id, bill_no, company_id, related_company_id, total, total_iva, other_expenses, is_paid, is_quote, is_sale_receipt, created_at) VALUES ('90ad80eb-1919-47c5-b921-d7048b276149', '2', 'a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516', 'a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516', 100, 50, 0, true, false, true, '2020-06-10 14:00:49.061184-05')`, undefined);
    await queryRunner.query(`INSERT INTO bill(id, bill_no, company_id, related_company_id, total, total_iva, other_expenses, is_paid, is_quote, is_sale_receipt, created_at) VALUES ('45e25b84-253b-4bf9-a8cd-61198a3a36be', '3', 'a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516', 'a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516', 100, 50, 0, true, false, true, '2020-10-10 14:00:49.061184-05')`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM bill WHERE id='45e25b84-253b-4bf9-a8cd-61198a3a36be'`, undefined);
    await queryRunner.query(`DELETE FROM bill WHERE id='90ad80eb-1919-47c5-b921-d7048b276149'`, undefined);
    await queryRunner.query(`DELETE FROM bill WHERE id='586a4d12-6deb-47df-a108-b38e8dfc7c1e'`, undefined);
    await queryRunner.query(`DELETE FROM bill WHERE id='b20edbe2-4dc7-4915-abc9-87b7a4b942ae'`, undefined);
    await queryRunner.query(`DELETE FROM company WHERE id='a5e4dbd6-cdf0-4b46-a66f-14c4f68cb516'`, undefined);
  }
}

export default SeedData1602352392300;
