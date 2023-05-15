import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { RequestPasswordRecoveryComponent } from './request-password-recovery/request-password-recovery.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CommentComponent } from './comment/comment.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { ChatComponent } from './chat/chat.component';
import { WorkshopChatsComponent } from './workshop-chats/workshop-chats.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AdminWorkshopsComponent } from './admin-workshops/admin-workshops.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordChangeComponent,
    PasswordRecoveryComponent,
    RequestPasswordRecoveryComponent,
    WorkshopsComponent,
    WorkshopComponent,
    ProfileComponent,
    EditProfileComponent,
    WorkshopDetailsComponent,
    CommentComponent,
    AdminLoginComponent,
    AdminComponent,
    EditUserComponent,
    AddUserComponent,
    EditWorkshopComponent,
    AddWorkshopComponent,
    ChatComponent,
    WorkshopChatsComponent,
    MainMenuComponent,
    SideMenuComponent,
    AdminWorkshopsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    LeafletModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule, 
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
