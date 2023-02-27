import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/shared/models/user.model';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  profile: UserToken | null = null;

  constructor(
    private tokenService: TokenService,
    private route: Router
  ){}

  ngOnInit() {
    this.tokenService.userToken$.subscribe(
      (userToken: UserToken | null) => {
        this.profile = userToken;
      }
    );
  }

  onLogout() {
    this.tokenService.removeToken();
    this.route.navigate(['/login']);
  }

}
