import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { NotificationIcon } from '../../enums/notification-icon.enum';
import { NotificationService } from '../../services/notification.service';
import { SubscribeService } from '../../services/subscribe.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent {
  public subscribeInputControl = new FormControl('', Validators.email);

  constructor(
    private subscribeService: SubscribeService,
    private notificationService: NotificationService
  ) {}

  public subscribeEmail(): void {
    if (!this.subscribeInputControl.value || this.subscribeInputControl.invalid) {
      return;
    }

    this.subscribeService.subscribeEmail(this.subscribeInputControl.value)
      .subscribe(
        () => {
          this.subscribeInputControl.reset('');
          this.notificationService.custom(
            'Email has been subscribed.',
            NotificationIcon.SUCCESS,
            { showConfirmButton: true }
          );
        }, (error) => {
          this.notificationService.custom(
            error,
            NotificationIcon.ERROR,
            { showConfirmButton: true }
          );
        }
      );
  }

}
