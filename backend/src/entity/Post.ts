import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Category from "./Category";
import User from "./User";

@Entity("post")
export default class Post extends BaseEntity {
  //순서
  @PrimaryGeneratedColumn()
  idx: number;

  //글 제목
  @Column({
    length: 255,
    nullable: false,
  })
  title: string;

  //글 설명
  @Column({
    length: 255,
    nullable: true,
  })
  description: string;

  //글 내용
  @Column("text", {
    nullable: false,
  })
  content: string;

  //글 표지
  @Column({
    length: 1000,
    nullable: true,
  })
  thumbnail: string;

  @Column({
    default: false,
    nullable: false,
  })
  is_deleted: boolean;

  @Column({
    default: false,
    nullable: false,
  })
  is_temp: boolean;

  @Column({
    default: false,
    nullable: false,
  })
  is_fixed: boolean;

  //글쓴이를 가져오기 위해 user 외래키 연결
  @ManyToOne((type) => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "fk_user_idx" })
  user: User;

  //카테고리 별 분류를 위해 category 외래키 연결
  @ManyToOne((type) => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_category_idx" })
  category: Category;

  //외래키 user 순서
  @Column({
    nullable: true,
  })
  fk_user_idx: number;

  //외래키 카테고리 순서
  @Column({
    nullable: true,
  })
  fk_category_idx: number;

  //작성일
  @Column("timestamptz")
  @CreateDateColumn()
  created_at: Date;

  //수정일
  @Column("timestamptz")
  @CreateDateColumn()
  updated_at: Date;
}
