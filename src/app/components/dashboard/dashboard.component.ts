import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private _students: Array<any> = [];

  constructor(private _authService: AuthService,
    private _firestore: FirestoreService) {
  }

  async ngOnInit(): Promise<void> {
    this._students = await this._firestore.getAfsResult();
  }
  

  get studentsList() {
    // this.firestoreService.retrieveStudents();
    // console.log(this.firestoreService.getAfsResult());
    return this._students;
  }
}
