import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("category")
export default class Category extends BaseEntity {
  //순서
  @PrimaryGeneratedColumn()
  idx: number;

  //카테고리 이름
  @Column({ length: 40, nullable: false })
  name: string;
}
