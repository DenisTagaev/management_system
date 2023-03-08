import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  student = {
    name:<string> '',
    faculty:<string> '',
    group:<string> '',
    term1: {
      subj1:<string> '',
      coef1: '',
      mark1: '',

      subj2:<string> '',
      coef2: '',
      mark2: '',

      subj3:<string> '',
      coef3: '',
      mark3: '',

      subj4:<string> '',
      coef4: '',
      mark4: '',

      subj5:<string> '',
      coef5: '',
      mark5: '',
      
      extra: '',
      average:<number> 0
    },
    term2: {
      subj1:<string> '',
      coef1: '',
      mark1: '',

      subj2:<string> '',
      coef2: '',
      mark2: '',

      subj3:<string> '',
      coef3: '',
      mark3: '',

      subj4:<string> '',
      coef4: '',
      mark4: '',

      subj5:<string> '',
      coef5: '',
      mark5: '',
      
      extra: '',
      average:<number> 0
    },
    projectedMark:<number> 0,
  }

  info: Array<any> = [];

  constructor(private firestoreService: FirestoreService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addStudent() {
    this.student.term1.average = this.countAverageMark(this.countCoef(this.student.term1), +this.student.term1.extra);
    this.student.term2.average = this.countAverageMark(this.countCoef(this.student.term2), +this.student.term2.extra)
    this.student.projectedMark = this.calculateProjectedMark(this.student.term1, this.student.term2);
    this.firestoreService.addStudent(this.student);
    this.router.navigate(['/dashboard']);
  }

  countAverageMark(Sum:number, extra:number):number {
    const Mark:number = Math.ceil((0.9*Sum+0.1*extra)*1000) / 1000;
    return Mark;
  }

  countCoef(marks: any):number {
    let sumOfCoef: number = 0;
    let sumOfMarks: number = 0;

    for(let i:number = 1; i <= 5; i++) {
        sumOfCoef+=marks[`mark${i}`]*marks[`coef${i}`];
        sumOfMarks+=marks[`coef${i}`];
    }

    let result:number = sumOfCoef/sumOfMarks;
    return result;
  }

  calculateProjectedMark(term1: any, term2: any) :number{    let projectedMark: number = 0;
    let difference:number = 0;    for(let i:number = 1; i <= 5; i++) {
      difference+= (term2[`mark${i}`]*term2[`coef${i}`]+0.5*term2[`coef${i}`]) -
        (term1[`mark${i}`]*term1[`coef${i}`]);
    }

    if(Math.abs(difference) <= 10) {
      projectedMark = term2.average + difference;
    } else {
      if(term1.average > term2.average) {
        projectedMark = term2.average - 10;
      } else {
        projectedMark = term2.average + 10;
      }
    }

    return projectedMark;
  }
}
