import { Component } from '@angular/core';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss'],
})
export class ShareButtonsComponent {
  public readonly desktopComponents = ['facebook', 'twitter', 'linkedin', 'telegram', 'messenger', 'whatsapp', 'email', 'copy'];
  public readonly mobileComponents = ['messenger', 'whatsapp', 'twitter', 'linkedin', 'facebook'];
}
