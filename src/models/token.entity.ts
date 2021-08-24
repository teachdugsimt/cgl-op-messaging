
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("token", { schema: "public" })
@Unique(["fcmToken", "userId"])
export class Token {
  @PrimaryGeneratedColumn({
    type: "bigint", name: "id"
  })
  id!: string;

  @Column("character varying", {
    name: "fcm_token",
    nullable: false,
    length: 255,
  })
  fcmToken!: string;

  @Column("character varying", { name: "user_id", nullable: false, length: 255 })
  userId!: string | null;

  @Column("character varying", { name: "bundle_id", nullable: true, length: 255 })
  bundleId!: string | null;

  @Column("character varying", { name: "platform", nullable: true, length: 255 })
  platform!: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date | null;

}
