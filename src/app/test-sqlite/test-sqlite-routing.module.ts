import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestSqlitePage } from './test-sqlite.page';

const routes: Routes = [
  {
    path: '',
    component: TestSqlitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestSqlitePageRoutingModule {}
