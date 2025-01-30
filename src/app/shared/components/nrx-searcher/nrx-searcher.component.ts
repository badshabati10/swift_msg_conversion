import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {DirectiveModule} from "../../../directives/upper-case.directive";
import {NrxPopupGridComponent} from "./nrx-popup-grid/nrx-popup-grid.component";
import {PopupTransition} from "./nrx-popup-grid/popup-transition";
import {CommonUtil} from "src/app/_helpers/common.util";


@Component({
  selector: 'app-nrx-searcher',
  templateUrl: './nrx-searcher.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DirectiveModule,
    NrxPopupGridComponent,
    ReactiveFormsModule,
  ],
})
export class NrxSearcherComponent implements OnChanges, OnInit {
  @Input() layout: 'vertical' | 'horizontal' = 'vertical'
  @Input() control!: FormControl;
  @Input() controlDep!: FormControl;
  @Input() required: boolean = true;
  @Input() title: string = '';
  @Input() value: any = '';
  @Input() description: string = '';
  @Input() searcherDisable = true;
  @Input() popupPayload: PopupTransition;
  @Input() fieldDisable = false;
  @Input() controlFieldKey: string = 'refCode';
  @Input() depControlFieldKey: string = 'depRefCode';
  @Input() maxLength: number;
  @Input() labelRatio: number = 5;
  @Input() descriptionFieldName: string = 'refCodeDesc';
  
  inputFieldRatio: number;

  // @Input() inputFieldRatio: number = 7;


  @Output() onSelectRowEmit = new EventEmitter<any>();
  @Output() onRemoveInputFieldEmit = new EventEmitter<any>();
  @ViewChild(NrxPopupGridComponent) nrxPopup: NrxPopupGridComponent;
  classInitializer = CommonUtil.classInitializer;


  ngOnInit(): void {
    this.inputFieldRatio = 12 - this.labelRatio
    if (this.fieldDisable) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searcherDisable']) {
      this.searcherDisable = changes['searcherDisable'].currentValue;
    }
    if (changes['description']) {
      this.description = changes['description'].currentValue;
    }
    if (changes['fieldDisable']) {
      this.fieldDisable = changes['fieldDisable'].currentValue;
      if (this.fieldDisable) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }

  }


  onChangeInputFieldWithDesc() {
    if (this.control) {
      this.description = '';
      if (this.controlFieldKey) {
        this.popupPayload.payload = {...this.popupPayload.payload,
          [this.controlFieldKey]: this.control.value,
          // [this.depControlFieldKey]: ''
        }
      }
      if(this.depControlFieldKey){
        this.popupPayload.payload = {...this.popupPayload.payload,
          [this.depControlFieldKey]: this.controlDep.value,
      }
      this.onRemoveInputFieldEmit.emit(this.popupPayload);
    }
  }
}

  onSearch() {
    if (!this.searcherDisable) {
      this.nrxPopup.startDialogBox(this.popupPayload);
      const buttonElement = document.activeElement as HTMLElement
      buttonElement.blur()
    }
  }

  reset() {
    if (this.control) {
      this.control.reset();
    }
  }

  onSelectedRow($event) {
    if (this.control) {
      if (this.controlFieldKey) {
        this.control?.setValue($event[this.controlFieldKey]);
      }
      if (this.descriptionFieldName) {
        this.description = $event[this.descriptionFieldName];
      }
      this.onSelectRowEmit.emit($event);
    }
  }
}
