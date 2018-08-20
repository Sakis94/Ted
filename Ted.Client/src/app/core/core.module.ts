import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from '../shared/shared.module'

import { LoaderService } from './loader/loader.service';

import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    RouterModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-bottom-right',
      newestOnTop: true
    })
  ],
  declarations: [
    NavbarComponent,
    LoaderComponent,
    ProfileComponent
  ],
  exports: [
    NavbarComponent,
    LoaderComponent,
    AuthModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parrentModule: CoreModule) {
    if (parrentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        LoaderService
      ]
    }
  }
}
