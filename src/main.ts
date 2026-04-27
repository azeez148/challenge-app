
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

console.log('Bootstrapping application...');
bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('Application bootstrapped!'))
  .catch((err) => console.error('Bootstrap error:', err));
