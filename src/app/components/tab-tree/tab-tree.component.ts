import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-tree',
  templateUrl: './tab-tree.component.html',
  styleUrls: ['./tab-tree.component.scss']
})
export class TabTreeComponent {
  activeIndex: number = 0;

  tabs = [
    {
      title: 'Tab 1',
      treeData: [
        {
          label: 'Pai 1',
          children: [
            { label: 'Filho 1.1' },
            { label: 'Filho 1.2' }
          ]
        },
        {
          label: 'Pai 2',
          children: [
            { label: 'Filho 2.1' },
            { label: 'Filho 2.2' }
          ]
        },
        {
          label: 'Pai 3',
          children: [
            { label: 'Filho 3.1' },
            { label: 'Filho 3.2' }
          ]
        }
      ]
    },
    {
      title: 'Tab 2',
      treeData: [
        {
          label: 'Pai 1',
          children: [
            { label: 'Filho 2.1' },
            { label: 'Filho 2.2' }
          ]
        }
      ]
    }
  ];
}