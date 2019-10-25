import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { OrganizationDetailComponent } from './containers/organization-detail/organization-detail.component';
/*
const organizationsRoutes: Routes = [
  { path: 'portal',
   children: [
    { path: 'organizationlist/:id',  component: OrganizationListComponent },
    { path: 'organizations/:id', component: OrganizationsComponent },
    { path: 'organizations', component: OrganizationsComponent }
    ]

];
*/

const organizationsRoutes: Routes = [
  {
    path:'portal',
    children:
    [{

          path: ':id',
          component: OrganizationListComponent,
          children: [
            {
              path: ':id',
              component: OrganizationDetailComponent
            }
            /*,
            {
              path: '',
              component: CrisisCenterHomeComponent
            }*/
          ]

    }]
  }]

@NgModule({
  imports: [
    RouterModule.forChild(organizationsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrganizationsRoutingModule { }
