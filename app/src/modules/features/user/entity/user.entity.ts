import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ autoIndex: true, timestamps: true, collection: 'users' })
export class UserEntity {
    @Prop({ required: true })
    firstName!: string;

    @Prop({ required: false })
    lastName?: string;
}

export type UserDocument = HydratedDocument<UserEntity>;

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.index({ storyId: 1, agreementNumber: 1 }, { unique: true });
UserSchema.index({ endDate: 1 }, { expireAfterSeconds: 0 });
UserSchema.index({ agreementNumber: 1 });

export const UserModelDefinition = {
    name: UserEntity.name,
    schema: UserSchema,
};
