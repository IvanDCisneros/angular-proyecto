import { NgModule } from '@angular/core';
import { PortalComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';
import { PortalServicesModule } from './services/services.module';

@NgModule({
  imports: [],
  exports: [
    PortalComponentsModule,
    PortalServicesModule,
    MaterialModule
  ]
  
})
export class PortalCommonsModule { }
