import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private _students: Array<any> = [];
  public student: any;
  public showButton: boolean = false;
  
  constructor(private _firestore: FirestoreService,
    private _route: ActivatedRoute, private _router: Router) { }

  async ngOnInit(): Promise<void> {
    this._students = await this._firestore.getAfsResult();
    const routeParams = this._route.snapshot.paramMap;
    const studentIdFromRoute = routeParams.get('id');
    
    this.student = this._students.find((s) =>
        s.id == studentIdFromRoute
    );
    this.showButton = localStorage.getItem('privileged') === '1'? true: false;
  }

  dropStudent(id: string) {
    this._firestore.deleteStudent(id)
      .then(() => this._router.navigate(['/dashboard']));
  }

}
