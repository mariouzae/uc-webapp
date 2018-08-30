import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PhoneComponent } from './components/phone/phone.component';
import { BaseComponent } from './components/base/base.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchContactsComponent } from './components/search-contacts/search-contacts.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { CallComponent } from './pages/call/call.component';
import { Routes, Route, RouterModule } from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';
import { LoginComponent } from './pages/login/login.component';
import { SipService } from './services/sip.service';
import { ChatComponent } from './components/chat/chat.component';
import { ChatUserComponent } from './pages/chat-user/chat-user.component';
import { IncomingCallComponent } from './components/incoming-call/incoming-call.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'phone', component: BaseComponent },
  { path: 'call/:name', component: CallComponent },
  { path: 'chat/:login', component: ChatUserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PhoneComponent,
    BaseComponent,
    SearchContactsComponent,
    CallComponent,
    FilterPipe,
    LoginComponent,
    ChatComponent,
    ChatUserComponent,
    IncomingCallComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
