import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

import { catchError, map, tap } from 'rxjs/operators';
import { error } from 'util';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}; 
@Injectable()

  export class HeroService {
      
      /* xác định Url địa chỉ tài nguyên heroes */
      private heroesUrl = 'api/heroes'; //URL web API
 
  constructor(
    
      private http: HttpClient,
      private messageService: MessageService) { }
          
    //hàm thay thế
    getHeroes(): Observable<Hero[]>{ //Observable<Hero[] phát ra 1 gtri
      /* Todo: send the message _after_ fetching the hero */
      //this.messageService.add('HeroService: fetched heroes');
      return this.http.get<Hero[]>(this.heroesUrl) // chuyển đổi để sd HttpClient
      .pipe(
        tap(heroes =>this.log('fetched 123')), //tap ghi lại hoạt động
        catchError(this.handleError('getHeroes',[]))
      );
  
    }
    /** GET hero by id. Will 404 if id not found */
    getHero(id: number):Observable<Hero>{
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id={id}`))
      );

    }
    /* khai báo hàm handleError */
    /** 
    * hoạt động Xử lý Http rằng thất bại. 
    * Cho phép ứng dụng tiếp tục. 
    * Hoạt động @ param - tên của hoạt động mà thất bại 
    * Kết quả @ param - giá trị tùy chọn để trở lại như là kết quả quan sát được 
    */
    private handleError<T> (operation = 'operation', result?: T){
      return(enjoy:any):Observable<T> =>{
          // TODO: gửi các lỗi đăng nhập từ xa cơ sở hạ tầng
          console.error(error); //login vào giao diện điều khiển thay thế
          
          // TODO: công việc tốt hơn của chuyển đổi lỗi cho người sử dụng tiêu dùng
            this.log (' ${operation} không thành công: ${error.message}');

          // Cho phép các ứng dụng tiếp tục chạy bằng cách trả lại kết quả sản phẩm nào đó.
            return of (result as T);
      }
    }
    
    /** PUT: update the hero on the server ( taoj ham` co nut update) */
    updateHero(hero:Hero):Observable<any>{
        return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
        tap(_ => this.log(`updated  hero id=${hero.id}`)),
        catchError(this.handleError<any>(`updateHero`))
      )
    }
    /* add thêm 1 new hero tới server */
    addHero(hero:Hero):Observable<Hero>{
        return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
        tap((hero:Hero) => this.log(`add hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>(`addHero`))
      )
    }
    /* xóa đi 1 hero */
    deleteHero(hero: Hero | number): Observable<Hero> {
      const id = typeof hero === 'number' ? hero : hero.id;
      const url = `${this.heroesUrl}/${id}`;
   
      return this.http.delete<Hero>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
    }
    /** Đăng nhập một thông báo HeroService với MessageService */
    private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
