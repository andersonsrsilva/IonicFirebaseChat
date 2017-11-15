import {NgModule} from '@angular/core';
import {CustomLoggedHeaderComponent} from './custom-logged-header/custom-logged-header';
import { MessageBoxComponent } from './message-box/message-box';
import { UserInfoComponent } from './user-info/user-info';
import { UserMenuComponent } from './user-menu/user-menu';

@NgModule({
  declarations: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent
  ],
  imports: [],
  exports: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent
  ]
})
export class ComponentsModule {
}
