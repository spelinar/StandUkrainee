import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { NotificationIcon } from '../enums/notification-icon.enum';

const ICON_COLOR = '#545454';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public close(): void {
    Swal.close();
  }

  public info(text: string): void {
    Swal.fire({
      text,
      icon: NotificationIcon.INFO,
      iconColor: ICON_COLOR,
      confirmButtonColor: '#FF984D',
      heightAuto: false,
    });
  }

  public custom(
    text: string,
    icon: NotificationIcon = NotificationIcon.INFO,
    { showConfirmButton, timer, timerProgressBar }: { showConfirmButton?: boolean; timer?: number; timerProgressBar?: boolean } = {}
  ): void {
    Swal.fire({
      text,
      icon,
      iconColor: ICON_COLOR,
      showConfirmButton,
      timer,
      timerProgressBar,
      heightAuto: false,
    });
  }
}
