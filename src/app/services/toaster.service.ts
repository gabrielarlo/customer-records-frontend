import { computed, Injectable, signal } from '@angular/core';

export enum ToasterType {
  SUCCESS = 'success',
  ERROR = 'error',
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  readonly isVisible = signal<boolean>(false);
  readonly message = signal<string>('');
  readonly type = signal<ToasterType>(ToasterType.SUCCESS);
  readonly isSuccess = computed(() => this.type() == ToasterType.SUCCESS);

  showToaster(message: string, type: ToasterType = ToasterType.SUCCESS) {
    this.message.set(message);
    this.type.set(type);
    this.isVisible.set(true);
    setTimeout(() => {
      this.isVisible.set(false);
    }, 5000);
  }
}
