import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'diplom';
  constructor(private _authService: AuthService) {

  }

  ngOnInit(): void{
  }
}
