import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit{
  public typeUser: string = "vendedor";
  public navItems = navItems;
  public navElements: INavData[] = [
    {
      name: 'Rent a Car',
      title: true
    },
    {
    name: 'Inicio',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    },
    {
      name: 'Agregar Auto',
      url: '/theme/colors', 
      iconComponent: { name: 'cil-car-alt' }
    },
    { 
      name: 'Ver lista de autos',
      url: '/theme/colors',
      iconComponent: { name: 'cil-list' }
    },
    {},
  ];
  ngOnInit(): void {

  }
  
  constructor() {}
}
