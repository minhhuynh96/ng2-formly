import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyForm} from "./components/formly.form";
import {FormlyField} from "./components/formly.field";
import {FormlyConfig} from "./services/formly.config";
import {FormlyMessage, FormlyMessages} from "./services/formly.messages";
import {FormlyProviders} from "./services/formly.providers";

export {FormlyCommon} from "./components/formly.common.component";
export {FormlyField} from "./components/formly.field";
export {FormlyFieldConfig} from "./components/formly.field.config";
export {FormlyForm} from "./components/formly.form";
export {FormlyConfig} from "./services/formly.config";
export {FormlyPubSub, FormlyEventEmitter} from "./services/formly.event.emitter";
export {FormlyMessage, FormlyMessages} from "./services/formly.messages";
export {FormlyFieldVisibilityDelegate} from "./services/formly.field.delegates"
export {FormlyProviders} from "./services/formly.providers";

export const FORMLY_DIRECTIVES = [FormlyForm, FormlyField, FormlyMessage];

@NgModule({
  declarations: FORMLY_DIRECTIVES,
  exports: FORMLY_DIRECTIVES,
  providers: [FormlyConfig, FormlyProviders],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class FormlyModule {}
