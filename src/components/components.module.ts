import {NgModule} from '@angular/core';
import {CustomLoggedHeaderComponent} from './custom-logged-header/custom-logged-header';
import { MessageBoxComponent } from './message-box/message-box';

@NgModule({
  declarations: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent
  ],
  imports: [],
  exports: [
    CustomLoggedHeaderComponent,
    MessageBoxComponent
  ]
})
export class ComponentsModule {
}
