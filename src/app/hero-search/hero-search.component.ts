import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { debounce } from 'rxjs/operators/debounce';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();


  constructor(private  heroService: HeroService) { }
  // Đẩy một cụm từ tìm kiếm vào trong dòng quan sát được.
  search(term: string):void{
    this.searchTerms.next(term);
  }
  ngOnInit():void {
    this.heroes$ = this.searchTerms.pipe(
      //chờ đợi 300ms sau mỗi phím tắt trước khi xem xét thuật ngữ
      debounceTime(300),

      // đảm bảo yêu cầu chỉ được gửi khi bộ lọc thay đổi.
      distinctUntilChanged(),

      /* gọi dịch vụ tìm kiếm cho mỗi cụm từ tìm kiếm mà nó thực hiện qua debouncevà distinctUntilChanged. 
       Nó hủy bỏ và loại bỏ các quan sát trước đó, chỉ trả lại dịch vụ tìm kiếm mới nhất 
       có thể quan sát được. */
      switchMap((term:string) => this.heroService.searchHero(term)),
    );
  }

}
