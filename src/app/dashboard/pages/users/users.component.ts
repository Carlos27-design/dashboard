import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { User } from '@interfaces/request-response';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TitleComponent, RouterModule],
  templateUrl: 'users.component.html',
})
export default class UsersComponent {
  public usersService = inject(UsersService);
}
