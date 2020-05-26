import { Resolver, Query, Ctx } from 'type-graphql';
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
}
