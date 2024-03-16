import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Router Link
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { CommonModule } from '@angular/common';

import { MaterialModule } from './moudules/material.module';
import { ComponentModule } from './moudules/component.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    ComponentModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }