import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { DeviceManagerComponent } from './app/features/devices/device-manager.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideRouter([
      { path: '', component: DeviceManagerComponent }
    ])
  ]
});
