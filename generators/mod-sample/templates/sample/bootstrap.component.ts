import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { RadioControlValueAccessor } from '@angular/forms';

@Component({
  selector: '${modname}-bootstrap',
  templateUrl: './${modname}-bootstrap.component.html',
  styleUrls: ['./${modname}-bootstrap.component.scss'],
  providers: [RadioControlValueAccessor]
})
export class ${classmodname}BootstrapComponent implements OnInit {

  public result = { input: {}, output: {} };

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {}
}
