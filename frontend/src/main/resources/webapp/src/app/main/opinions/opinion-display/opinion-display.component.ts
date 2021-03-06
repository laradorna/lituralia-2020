import {Component, Input, OnInit} from '@angular/core';
import {Opinion} from "../../../shared/domain/opinion";

@Component({
  selector: 'app-opinion-display',
  templateUrl: './opinion-display.component.html',
  styleUrls: ['./opinion-display.component.scss']
})
export class OpinionDisplayComponent implements OnInit {

  @Input() opinion: Opinion
  @Input() showUser: boolean = true

  constructor() { }

  ngOnInit() {
  }

}
