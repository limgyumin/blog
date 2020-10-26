import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity("like")
export default class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne((type) => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "fk_user_idx" })
  user: User;

  @ManyToOne((type) => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_post_idx" })
  post: Post;

  @Column({
    nullable: true,
  })
  fk_user_idx: number;

  @Column({
    nullable: true,
  })
  fk_post_idx: number;
}
