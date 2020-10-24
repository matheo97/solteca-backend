import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class CompanyType1603480778300 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TYPE company_type AS ENUM ('customer', 'supplier', 'both')`, undefined);
    await queryRunner.addColumn('company', 
      new TableColumn({
        name: 'type',
        type: 'company_type',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('company', 'type');
    await queryRunner.query(`DROP TYPE company_type`, undefined);
  }
}

export default CompanyType1603480778300;
