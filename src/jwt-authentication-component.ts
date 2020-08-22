// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {registerAuthenticationStrategy} from '@loopback/authentication';
import {
  Application,
  Binding,
  Component,
  CoreBindings,
  createBindingFromClass,
  inject,
} from '@loopback/core';
import {
  TokenServiceBindings,
  TokenServiceConstants,
  UserServiceBindings,
} from './keys';
import {UserRepository,UserCredentialsRepository} from './repositories';
import {MyUserService} from './services';
import {JWTAuthenticationStrategy} from './services';
import {JWTService} from './services';
import {SecuritySpecEnhancer} from './services';

export class JWTAuthenticationComponent implements Component {
  bindings: Binding[] = [
    // token bindings
    Binding.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    ),
    Binding.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    ),
    Binding.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService),

    // user bindings
    Binding.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService),
    Binding.bind(UserServiceBindings.USER_REPOSITORY).toClass(UserRepository),
    Binding.bind(UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(
      UserCredentialsRepository,
    ),
    createBindingFromClass(SecuritySpecEnhancer),
  ];
  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application) {
    registerAuthenticationStrategy(app, JWTAuthenticationStrategy);
  }
}
