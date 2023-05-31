import { Lifetime, createContainer, InjectionMode, asClass } from 'awilix'
import { Server } from './server';

// Important to be loaded by awilix
export * from './modules';
export { Server }


async function start() {

  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  })

  container.loadModules([
    './*.js',
  ],
    {
      //   // We want to register `UserService` as `userService` -
      //   // by default loaded modules are registered with the
      //   // name of the file (minus the extension)
      formatName: 'camelCase',
      resolverOptions: {
        injectionMode: InjectionMode.PROXY,
        lifetime: Lifetime.SINGLETON,
      }
    }
  );

  const server = container.resolve<Server>('server');
  await server.bootstrap();
  await server.run();
}

export { start }
