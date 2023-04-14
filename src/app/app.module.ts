import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatNativeDateModule } from '@angular/material/core'
import { ErrorCatchingInterceptor } from '@interceptors/error-catching.interceptor'
import { ComponentsModule } from './components/components.module'
import { SharedModule } from './shared/shared.module'
import { HttpRequestInterceptor } from '@interceptors/http-request.interceptor'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [
    HttpRequestInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
