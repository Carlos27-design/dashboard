import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { User } from '@interfaces/request-response';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title [title]="titleLabel()" />
    @if(user()){
    <section>
      <img [srcset]="user()!.avatar" [alt]="user()!.first_name" />

      <div>
        <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
        <p>{{ user()?.email }}</p>
      </div>
    </section>
    }@else {
    <p>Cargando informacion</p>
    }
  `,
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UsersService);

  //titleLabel = Informacion del usuario: Tracel Ramos

  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.userService.getUserById(id))
    )
  );

  public titleLabel = computed(() => {
    if (this.user()) {
      return `Informacion del Usuario: ${this.user()?.first_name} ${
        this.user()?.last_name
      }`;
    }

    return `Informacion del Usuario`;
  });

  constructor() {
    //this.route.paramMap.subscribe((params) => {
    //});
  }
}
