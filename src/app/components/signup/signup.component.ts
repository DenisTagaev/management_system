import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  
  constructor(private _auth: AuthService) { }

  register() {
    if (this.email.trim() == "" || this.password.trim() == "") {
      alert("Please fill all required fields");
      return;
    }
    this._auth.register(this.email, this.password);
    this.email = this.password = "";
  }

  ngOnInit(): void {
  }

}
