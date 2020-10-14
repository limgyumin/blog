import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import User from "./User";
import Comment from "./Comment";

@Entity("reply")
export default class Reply extends BaseEntity {
  //순서
  @PrimaryGeneratedColumn()
  idx: number;

  //답글 내용
  @Column("text", {
    nullable: false,
  })
  content: string;

  //답글쓴이를 가져오기 위해 user 외래키 연결
  @ManyToOne((type) => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "fk_user_idx" })
  user: User;

  //댓글에 답글을 써야하므로 comment 외래키 연결
  @ManyToOne((type) => Comment, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_comment_idx" })
  comment: Comment;

  //외래키 user 순서
  @Column({
    nullable: true,
  })
  fk_user_idx: number;

  //외래키 comment 순서
  @Column({
    nullable: true,
  })
  fk_comment_idx: number;

  //답글 작성일
  @Column("timestamptz")
  @CreateDateColumn()
  created_at: Date;

  //답글 수정일
  @Column("timestamptz")
  @CreateDateColumn()
  updated_at: Date;
}
