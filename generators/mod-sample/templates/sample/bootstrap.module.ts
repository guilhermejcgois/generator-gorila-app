import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ${classmodname}Module } from '../src/${modname}.module';
import { ${classmodname}BootstrapComponent } from './${modname}-bootstrap.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ${classmodname}Module
  ],
  declarations: [${classmodname}BootstrapComponent],
  bootstrap: [${classmodname}BootstrapComponent]
})
export class ${classmodname}BootstrapModule { }
