import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    // console.log(this.authService.isLoggedIn)
  }
  
  login(){
    if (this.email == "" || this.password == "") {
      alert("Please fill all required fields");
      return;
    }
    this._authService.login(this.email, this.password);
    this.email = this.password = "";
  }
}
