import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public showButton: boolean = false;
  
  constructor(private _authService: AuthService) {

  }
  //при инициации компонента идет проверка было ли указано в токене пользователя что он обладает привилегиями админа
  //если да, прослушка указывает что кнопку добавления пользователя необходимо зарендерить в компоненте
  ngOnInit(): void{
    this.showButton = localStorage.getItem('privileged') === '1'? true: false;
  }

  // ngOnChanges

  logout() {
    this._authService.signOut();
  }
  //при выходе из учетной записи кнопка удаляется из DOM дерева и не будет рендерится в компоненте при повторной загрузке
  ngOnDestroy() {
    this.showButton = false;
  }
}
