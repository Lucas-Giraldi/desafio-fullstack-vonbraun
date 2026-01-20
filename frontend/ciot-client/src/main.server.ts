import 'zone.js/node';
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { DeviceManagerComponent } from './app/features/devices/device-manager.component';

export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(
    AppComponent,
    {
      providers: [
        provideHttpClient(withInterceptorsFromDi(), withFetch()),
        provideRouter([
          { path: '', component: DeviceManagerComponent }
        ])
      ]
    },
    context
  );
}
