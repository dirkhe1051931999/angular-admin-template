import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService, parseTime } from '@shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private messenger: MessageService) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums').subscribe(res => {
      console.log(res);
    });
    this.http.get<any[]>('https://yun.thecover.cn/fmio/ip').subscribe(res => {
      console.log(res);
    });
  }
  get messages() {
    return this.messenger.messages.join('-');
  }
}
