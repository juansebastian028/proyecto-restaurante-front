import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  clickEvent !: boolean;

  @Input() sendMessage = new EventEmitter();

  onClick() {
    this.clickEvent = !this.clickEvent;
  }

  ngOnInit(): void {
  }
}
