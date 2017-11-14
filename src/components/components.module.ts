import {NgModule} from '@angular/core';
import {CustomLoggedHeaderComponent} from './custom-logged-header/custom-logged-header';
import { MessageBoxComponent } from './message-box/message-box';
import { UserInfoComponent } from './user-info/user-info';

@NgModule({
  declarations: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent
  ],
  imports: [],
  exports: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent
  ]
})
export class ComponentsModule {
}
