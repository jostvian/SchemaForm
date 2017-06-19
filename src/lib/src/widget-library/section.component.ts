import { Component, Input, OnInit } from '@angular/core';

import { JsonSchemaFormService } from '../json-schema-form.service';

@Component({
  selector: 'section-widget',
  template: `
    <div
      [class]="options?.htmlClass"
      [class.expandable]="options?.expandable && !expanded"
      [class.expanded]="options?.expandable && expanded">
      <label *ngIf="options?.title"
        [class]="options?.labelHtmlClass"
        [style.display]="options?.notitle ? 'none' : ''"
        [innerHTML]="options?.title"
        (click)="expand()"></label>

        <root-widget *ngIf="expanded"
          [formID]="formID"
          [layout]="layoutNode.items"
          [dataIndex]="dataIndex"
          [layoutIndex]="layoutIndex"
          [isOrderable]="options?.orderable"></root-widget>

    </div>`,
  styles: [`
    .expandable > label:before { content: '▶'; padding-right: .3em; }
    .expanded > label:before { content: '▼'; padding-right: .2em; }
  `],
})
export class SectionComponent implements OnInit {
  options: any;
  expanded: boolean = true;
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.expanded = !this.options.expandable;
  }

  expand() {
    if (this.options.expandable) { this.expanded = !this.expanded; }
  }
}