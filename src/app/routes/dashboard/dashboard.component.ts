import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums').subscribe(res => {
      console.log(res);
    });
    this.http.get<any[]>('https://yun1.thecover.cn/fmio/ip').subscribe(res => {
      console.log(res);
    });
    this.http.get<any[]>('https://xw.yc.ifeng.com/api/book/store/3').subscribe(res => {
      console.log(res);
    });
    
  }
}
