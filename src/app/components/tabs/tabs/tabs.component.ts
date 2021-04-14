import { Component, OnInit, QueryList, ContentChildren} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @ContentChildren(TabComponent)tabs!: QueryList<TabComponent>; 
  
  constructor() {}

  ngAfterContentInit() {

    const activeTabs = this.tabs.filter(tab => tab.active);
  
    if (activeTabs.length === 0) {
        this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {

    this.tabs.toArray().forEach(tab => (tab.active = false));

    tab.active = true;
  }

  ngOnInit(): void {
  }

}
