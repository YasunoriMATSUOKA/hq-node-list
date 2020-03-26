import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NodesTableComponent } from './nodes-table/nodes-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: NodesTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
