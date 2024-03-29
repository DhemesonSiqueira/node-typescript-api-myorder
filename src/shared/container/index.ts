import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import RestaurantsRepository from '@modules/restaurants/infra/typeorm/repositories/RestaurantsRepository';

import IRestaurantTokensRepository from '@modules/restaurants/repositories/IRestaurantTokensRepository';
import RestaurantTokensRepository from '@modules/restaurants/infra/typeorm/repositories/RestaurantTokensRepository';

import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/products/infra/typeorm/repositories/CategoriesRepository';

import ITablesRepository from '@modules/restaurants/repositories/ITablesRepository';
import TablesRepository from '@modules/restaurants/infra/typeorm/repositories/TablesRepository';

import AddressRepository from '@modules/restaurants/infra/typeorm/repositories/AddressRepository';
import IAddressRepository from '@modules/restaurants/repositories/IAddressRepository';

import OptionsGroupRepository from '@modules/products/infra/typeorm/repositories/OptionsGroupRepository';
import IOptionsGroupRepository from '@modules/products/repositories/IOptionsGRepository';

import OptionsRepository from '@modules/products/infra/typeorm/repositories/OptionsRepository';
import IOptionsRepository from '@modules/products/repositories/IOptionsGroupRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IRestaurantsRepository>(
  'RestaurantsRepository',
  RestaurantsRepository,
);

container.registerSingleton<IRestaurantTokensRepository>(
  'RestaurantTokensRepository',
  RestaurantTokensRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IOptionsGroupRepository>(
  'OptionsGroupRepository',
  OptionsGroupRepository,
);

container.registerSingleton<ITablesRepository>(
  'TablesRepository',
  TablesRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);

container.registerSingleton<IOptionsRepository>(
  'OptionsRepository',
  OptionsRepository,
);
