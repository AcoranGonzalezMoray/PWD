import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestSqlitePageRoutingModule } from './test-sqlite-routing.module';

import { TestSqlitePage } from './test-sqlite.page';
import { SQLite} from "@ionic-native/sqlite/ngx";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestSqlitePageRoutingModule
  ],
  declarations: [TestSqlitePage],
  providers: [SQLite]
})
export class TestSqlitePageModule {}
