import {Component, OnInit} from '@angular/core';
import {RequestService} from './request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  feature: String;

  features: String;

  email: String;

  constructor(private requestService: RequestService) {
  }

  ngOnInit() {
    this.get();
  }

  save() {
    this.requestService.postFeature(this.feature)
      .subscribe(
        () => {
          this.get();
        },
        (error) => console.log(error)
      );
  }

  get() {
    this.requestService.fetchFeatures()
      .subscribe(
        (response) => {
          this.features = response.text();
        },
        (error) => console.log(error)
      );
  }
}
