import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject } from 'rxjs';


export interface Song {
  id: number;
  artist_name: string;
  song_name: string;
}


@Component({
  selector: 'app-test-sqlite',
  templateUrl: './test-sqlite.page.html',
  styleUrls: ['./test-sqlite.page.scss'],
})

export class TestSqlitePage {
  private storage!: SQLiteObject;
  songsList: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);

  constructor(private sqlite: SQLite) {

  }

  ionViewDidEnter() {
    this.getSongs();
  }

  async getSongs() {
    this.storage = await this.sqlite.create({
      name: 'mydb.db',
      location: 'default'
    });
    this.storage.executeSql('DROP TABLE IF EXISTS songtable', [])
    this.storage.executeSql('CREATE TABLE IF NOT EXISTS songtable(id INTEGER PRIMARY KEY AUTOINCREMENT, artist_name TEXT, song_name TEXT)', []);
    this.storage.executeSql('INSERT INTO songtable (artist_name, song_name) VALUES ("Oruba", "Song1")', []);
    this.storage.executeSql('INSERT INTO songtable (artist_name, song_name) VALUES ("Oruba", "Song2")', []);
    this.storage.executeSql('INSERT INTO songtable (artist_name, song_name) VALUES ("Oruba", "Song3")', []);
    this.storage.executeSql('SELECT * FROM songtable', []).then(res => {this.pushSong(res)});
  }



  pushSong(res:any){
    let items: Song[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      items.push({
        id: res.rows.item(i).id,
        artist_name: res.rows.item(i).artist_name,
        song_name: res.rows.item(i).song_name
      });
    }
    this.songsList.next(items);
  }


}
