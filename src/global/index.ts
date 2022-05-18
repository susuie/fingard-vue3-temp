import { App } from 'vue';
import registerCpn from './register-cpn';
import registerElement from './register-element';
export function globalRegister(app: App): void {
  app.use(registerElement);
  app.use(registerCpn);
}
