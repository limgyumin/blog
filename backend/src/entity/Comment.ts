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
import Post from "./Post";

@Entity("comment")
export default class Comment extends BaseEntity {
  //순서
  @PrimaryGeneratedColumn()
  idx: number;

  //댓글 내용
  @Column("text", {
    nullable: false,
  })
  content: string;

  //댓글쓴이를 가져오기 위해 user 외래키 연결
  @ManyToOne((type) => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "fk_user_idx" })
  user: User;

  //글 속에 댓글을 써야하므로 post 외래키 연결
  @ManyToOne((type) => Post, { onDelete: "SET NULL" })
  @JoinColumn({ name: "fk_post_idx" })
  post: Post;

  //외래키 user 순서
  @Column({
    nullable: true,
  })
  fk_user_idx: number;

  //외래키 post 순서
  @Column({
    nullable: true,
  })
  fk_post_idx: number;

  //댓글 작성일
  @Column("timestamptz")
  @CreateDateColumn()
  created_at: Date;

  //댓글 수정일
  @Column("timestamptz")
  @CreateDateColumn()
  updated_at: Date;
}
