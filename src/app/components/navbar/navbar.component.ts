import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public class = "";

  constructor(private helper: HelperService) { }

  ngOnInit(): void {
    this.helper.customMessage.subscribe(msg => this.class = msg);
  }

  public changeClass(){
    if(this.class == ""){
      this.class = "toggled";
    }else{
      this.class = "";
    }

    this.helper.changeMessage(this.class);
  }

}
