import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NodesTableComponent } from './nodes-table/nodes-table.component';


const routes: Routes = [
  { path: '', component: NodesTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
