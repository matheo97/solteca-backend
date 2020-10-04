import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class CompanyAdminField1601765144230 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn('company', 
      new TableColumn({
        name: 'is_admin',
        type: 'boolean',
        default: false,
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('company', 'is_admin');
  }
}

export default CompanyAdminField1601765144230;
