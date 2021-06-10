import { DeleteResult } from 'typeorm';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import Address from '../infra/typeorm/entities/Address';

export default interface IAddressRepository {
  findByRestaurantId(restaurant_id: string): Promise<Address | undefined>;
  findById(id: string): Promise<Address | undefined>;
  findByNumber(number: number): Promise<Address | undefined>;
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
  delete(address_id: string): Promise<DeleteResult>;
}
