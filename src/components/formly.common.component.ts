import {EventEmitter, ElementRef, Renderer} from "@angular/core";
import {FormlyFieldExpressionDelegate, FormlyFieldVisibilityDelegate} from "../services/formly.field.delegates";
import {FormlyPubSub} from "../services/formly.event.emitter";
import {FormlyConfig} from "../services/formly.config";
import {FormlyFieldConfig} from "./formly.field.config";
import {FormGroup} from "@angular/forms";

export class FormlyCommon {

  public formModel: any;
  public field: FormlyFieldConfig;
  public form: FormGroup;
  public _hide: any;

  formSubmit = new EventEmitter();


  protected _model: any;
  update;
  visibilityDelegate: FormlyFieldVisibilityDelegate;
  expressionDelegate: FormlyFieldExpressionDelegate;


  constructor(protected elem: ElementRef, protected ps: FormlyPubSub, protected formlyConfig: FormlyConfig,
              private renderer: Renderer) {
    this.visibilityDelegate = new FormlyFieldVisibilityDelegate(this);
    this.expressionDelegate = new FormlyFieldExpressionDelegate(this);
  }

  public get model(): any {
    return this._model;
  };

  public set model(value) {
    this._model = value;
    this.ps.Stream.emit(this.form);
  }


  public get hide() {
    return this._hide;
  }
  public set hide(value: boolean) {
    this._hide = value;
    this.renderer.setElementStyle(this.elem.nativeElement, "display", value ? "none" : "");
    if (this.field.fieldGroup) {
      for (let i = 0; i < this.field.fieldGroup.length; i++) {
        this.psEmit(this.field.fieldGroup[i].key, "hidden", this._hide);
      }
    } else {
      this.psEmit(this.field.key, "hidden", this._hide);
    }
  }

  private psEmit(fieldKey: string, eventKey: string, value: any) {
    if (this.ps && this.ps.getEmitter(fieldKey) && this.ps.getEmitter(fieldKey).emit) {
      this.ps.getEmitter(fieldKey).emit({
        key: eventKey,
        value: value
      });
    }
  }

  ngDoCheck() {
    this.visibilityDelegate.checkVisibilityChange();
    this.expressionDelegate.checkExpressionChange();
  }
}
