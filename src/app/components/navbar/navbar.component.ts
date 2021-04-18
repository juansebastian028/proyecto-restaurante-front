import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public class = '';
  public classSide = '';
  public classUl = "d-flex";
  public classSearch = ["d-none","d-sm-block"];
  public classArrow = "d-none";

  constructor(private helper: HelperService) { }

  ngOnInit(): void {
    this.helper.customMessage.subscribe(msg => this.class = msg);
    console.log(this.classUl)
  }

  public changeClass(){
    if(this.class == ""){
      this.class = "toggled";
    }else{
      this.class = "";
    }

    this.helper.changeMessage(this.class);
  }

  changeNewClass(){
    if(this.classSide == ""){
      this.classSide = "d-none d-sm-block";
      this.classSearch = ["d-block", "d-sm-none", "inputSearch"];
      this.classUl = "d-none";
      this.classArrow = "d-block";
    }else{
      this.classSide = "";
      this.classSearch = ["d-none", "d-sm-block"]
      this.classUl = "d-flex";
      this.classArrow = "d-none";
    }
  }
}
