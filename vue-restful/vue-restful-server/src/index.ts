import {VueRestfulServerApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {VueRestfulServerApplication};

export async function main(options?: ApplicationConfig) {
  const app = new VueRestfulServerApplication(options);
  await app.boot();
  await app.start();
  return app;
}
