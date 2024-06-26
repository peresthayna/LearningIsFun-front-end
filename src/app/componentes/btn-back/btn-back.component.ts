import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-back',
  templateUrl: './btn-back.component.html',
  styleUrls: ['./btn-back.component.css']
})
export class BtnBackComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public onBack(): void {
    this.location.back();
  }

}
