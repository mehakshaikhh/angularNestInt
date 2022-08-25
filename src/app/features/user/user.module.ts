import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from 'src/app/core/auth/auth.module';
import { UserService } from './user.service';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    AuthModule,
  ],
  providers: [
    UserService,
  ]
})
export class UserModule { }
