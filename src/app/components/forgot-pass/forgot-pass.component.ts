import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})

export class ForgotPassComponent implements OnInit {
  email: string= '';

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }
  
  restorePassword() {
    this._authService.restorePassword(this.email);
    this.email = '';
  }

}
