import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { MediaType, ModuleType } from '@prisma/client';
registerEnumType(MediaType, {
  name: 'MediaType',
});
registerEnumType(ModuleType, {
  name: 'ModuleType',
});
@ObjectType()
export class CommonMedia {
  @Field(() => ID)
  id: string;

  @Field()
  url: string;

  @Field()
  type: MediaType;

  @Field()
  moduleType: ModuleType;

  @Field()
  createdAt: Date;
}
