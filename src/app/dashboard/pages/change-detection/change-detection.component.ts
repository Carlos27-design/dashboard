import {
  Component,
  signal,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()" />

    <pre>{{ frameworkasSignal() | json }}</pre>
    <pre>{{ frameworkasProperty | json }}</pre>
  `,
})
export default class ChangeDetectionComponent {
  public currentFramework = computed(() => {
    return `Change detection - ${this.frameworkasSignal().name}`;
  });
  public frameworkasSignal = signal({ name: 'Angular', realeaseDate: 2012 });
  public frameworkasProperty = {
    name: 'Angular',
    realeaseDate: 2019,
  };

  constructor() {
    setTimeout(() => {
      this.frameworkasSignal.update((value) => ({
        ...value,
        name: 'React',
      }));
    }, 3000);
  }
}
