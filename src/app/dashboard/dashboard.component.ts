import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService} from '../hero.service';

@Component({  
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes:Hero[] = [];

  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void{
    //getHeroeslàm giảm số lượng các anh hùng được hiển thị cho bốn (thứ 2, thứ 3, thứ 4 và thứ 5).
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(0,4));

  }

}
