import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.view.html',
  styleUrls: ['./detail.view.scss']
})
export class DetailView implements OnInit {

  idProducto!: number;
  constructor(private route: ActivatedRoute) {
   
  }

  ngOnInit(): void {
    this.idProducto = this.route.snapshot.params['id'];
  }
}
