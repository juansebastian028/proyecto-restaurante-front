import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input('tabTitle') title: string = '';
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template!:any;
  @Input() dataContext!:any;

  constructor() { }

  ngOnInit(): void {
  }

}
