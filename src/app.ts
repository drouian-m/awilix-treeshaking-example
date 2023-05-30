import { Lifetime, createContainer, InjectionMode } from 'awilix'
import { UserService } from './modules';
import { Server } from './server';
export * from './modules';


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

  console.log('BOOTING...')
  console.log(container.registrations)

  const userService = container.resolve<UserService>('userService');
  console.log(await userService.getUserPosts('doe-j'));


  const server = container.resolve<Server>('server');
  await server.bootstrap();
  await server.run();
}

start();
