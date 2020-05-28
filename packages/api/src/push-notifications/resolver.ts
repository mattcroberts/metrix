import { Resolver, Query, Ctx, Mutation, Arg } from 'type-graphql';
import { DeviceRegistration } from './DeviceRegistration.model';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { ContextType } from '../types';

@Resolver((of) => DeviceRegistration)
export class DeviceRegistrationResolver {
  @InjectRepository(DeviceRegistration)
  private deviceRegistrationRepository: Repository<DeviceRegistration>;

  @Query((returns) => [DeviceRegistration])
  devices(@Ctx() { user }: ContextType) {
    return this.deviceRegistrationRepository.find({ user });
  }

  @Mutation((returns) => DeviceRegistration)
  registerDevice(@Ctx() { user }: ContextType, @Arg('token') token: string) {
    return this.deviceRegistrationRepository.save({ token, user });
  }

  @Mutation((returns) => Boolean, { nullable: true })
  unregisterDevice(@Ctx() { user }: ContextType, @Arg('id') id: string) {
    this.deviceRegistrationRepository.delete({ user, id });
  }
}
