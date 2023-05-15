import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminWorkshopsComponent } from './admin-workshops/admin-workshops.component';
import { AdminComponent } from './admin/admin.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { AdminGuard } from './guards/admin.guard';
import { LoggedGuard } from './guards/logged.guard';
import { OrganizerGuard } from './guards/organizer.guard';
import { OrganizerAdminGuard } from './guards/organizeradmin.guard';
import { ParticipantOrganizerGuard } from './guards/participantorganizer.guard';
import { LoginComponent } from './login/login.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RequestPasswordRecoveryComponent } from './request-password-recovery/request-password-recovery.component';
import { WorkshopChatsComponent } from './workshop-chats/workshop-chats.component';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';
import { WorkshopsComponent } from './workshops/workshops.component';

const routes: Routes = [
  {path : '', component: LoginComponent},
  {path : 'loginAdmin', component: AdminLoginComponent},

  {path : 'register', component: RegisterComponent},
  {path : 'requestPasswordRecovery', component: RequestPasswordRecoveryComponent},
  {path : 'passwordChange', component: PasswordChangeComponent, canActivate : [LoggedGuard]},
  {path : 'passwordRecovery/:username', component: PasswordRecoveryComponent},
  
  {path : 'workshops', component: WorkshopsComponent},
  {path : 'profile', component: ProfileComponent, canActivate : [LoggedGuard, ParticipantOrganizerGuard]},
  {path : 'editProfile/:username', component: EditProfileComponent, canActivate : [LoggedGuard, ParticipantOrganizerGuard]},
  {path : 'workshopDetail/:_id', component: WorkshopDetailsComponent, canActivate : [LoggedGuard]},

  {path : 'admin', component: AdminComponent, canActivate : [LoggedGuard, AdminGuard]},
  {path : 'editUser/:username', component: EditUserComponent, canActivate : [LoggedGuard, AdminGuard]},
  {path : 'addUser', component: AddUserComponent, canActivate : [LoggedGuard, AdminGuard]},
  {path : 'editWorkshop/:_id', component: EditWorkshopComponent, canActivate : [LoggedGuard, OrganizerAdminGuard]},
  {path : 'addWorkshop', component: AddWorkshopComponent, canActivate : [LoggedGuard]},
  {path : 'workshopChats/:_id', component: WorkshopChatsComponent, canActivate : [LoggedGuard, OrganizerGuard]},
  {path : 'workshopsAdmin', component: AdminWorkshopsComponent, canActivate : [LoggedGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
