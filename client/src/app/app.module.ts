import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Router Link
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { CommonModule } from '@angular/common';

import { MaterialModule } from './moudules/material.module';
import { ComponentModule } from './moudules/component.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }