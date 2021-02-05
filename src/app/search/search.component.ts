import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { RepositoriesService } from '../repositories/repositories.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private subscription: Subscription;
 
  displayedColumns: string[] = ['name', 'html_url', 'fork', 'created_at'];
  repositories = new MatTableDataSource<any>();
 
  constructor(private route: ActivatedRoute,
              private router: Router,
              private repositoriesService: RepositoriesService) { }
 
  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.searchRepositoriesForUser(params['query']);
    });
  }
 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
  async searchRepositoriesForUser(query: string) {
    const results = await this.repositoriesService.searchRepositoriesForUser(query);
    this.repositories.data = results;
  } 
}