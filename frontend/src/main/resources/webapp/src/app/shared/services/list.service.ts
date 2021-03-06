import {Injectable, Injector} from '@angular/core';
import {LoginService, Observable, OntimizeEEService} from "ontimize-web-ngx";
import {catchError, map, tap} from "rxjs/operators";
import {OntimizeResponse, tapError} from "./ontimizeResponse";
import {Book} from "../domain/book";
import {BookList} from "../domain/book-list";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListService extends OntimizeEEService {

  constructor(protected injector: Injector,
              private loginService: LoginService) {
    super(injector);
    const conf = this.getDefaultServiceConfiguration();
    conf['path'] = '/lists';
    this.configureService(conf)
  }

  getLists(): Observable<OntimizeResponse<BookList>> {
    const filter = {};
    const columns = [
      "list_id", "list_name", "list_public", "list_desc", "list_create", "list_update", "user_"
    ];
    return this.query(filter, columns, 'list').pipe(
      tap(x => console.log(x)),
      catchError(tapError('getLists'))
    )
  }

  public static NOT_LOGGED_IN = "NOT_LOGGED_IN";

  getPrivateUserList(): Observable<OntimizeResponse<BookList>> {
    if (!this.loginService.getSessionInfo().user)
      return throwError(new Error(ListService.NOT_LOGGED_IN))
    const filter = {
      'user_': this.loginService.getSessionInfo().user,
      'list_public': false
    };
    const columns = [
      "list_id", "list_name", "list_public", "list_desc", "list_create", "list_update", "user_"
    ];
    return this.query(filter, columns, 'list').pipe(
      // tap(x => console.log(x)),
      catchError(tapError('getPrivateUserList'))
    )
  }


  initPrivateList(): Observable<boolean> {
    if (!this.loginService.getSessionInfo().user)
      return throwError(new Error(ListService.NOT_LOGGED_IN))
    const data = {
      "list_name": "MY_LIST",
      "list_desc": "",
      'user_': this.loginService.getSessionInfo().user,
      'list_public': false,
    };
    return this.insert(data, 'list').pipe(
      // tap(x => console.log(x)),
      catchError(tapError('initPrivateList')),
      map(response => response.code === 0)
    )
  }

  getListBooks(list_id: number): Observable<OntimizeResponse<Book>> {
    const filter = {
      'list_id': list_id
    };
    const columns = [
      "book_id", "isbn", "cover", "title", "synopsis",
      "publish_date", "publisher_id",
      "publisher_name", "author_names", "author_ids", "genre_names", "genre_ids", "avg_rating", "ratings",
      "list_id", "list_book_id",
    ];
    return this.query(filter, columns, 'vListBook').pipe(
      // tap(x => console.log(x)),
      catchError(tapError('getListBooks'))
    )
  }

  getListBooksIds(list_id: number): Observable<OntimizeResponse<Book>> {
    const filter = {
      'list_id': list_id
    };
    const columns = [
      "book_id",
      "list_id", "list_book_id"
    ];
    return this.query(filter, columns, 'vListBook').pipe(
      // tap(x => console.log(x)),
      catchError(tapError('getListBooksIds'))
    )
  }

  removeBookFromList(list_book_id: number, book_id: number, list_id: number): Observable<boolean> {
    if (!this.loginService.getSessionInfo().user)
      return throwError(new Error(ListService.NOT_LOGGED_IN))
    const filter = {
      'list_book_id': list_book_id,
      'book_id': book_id,
      'list_id': list_id
    };
    return this.delete(filter, 'listBook').pipe(
      // tap(x => console.log(x)),
      catchError(tapError('removeBookFromList')),
      map(response => response.code === 0)
    )
  }


  addBookToUserList(book_id: number, list_id: number): Observable<boolean> {
    if (!this.loginService.getSessionInfo().user)
      return throwError(new Error(ListService.NOT_LOGGED_IN))
    const data = {
      "list_id": list_id,
      "book_id": book_id
    };
    return this.insert(data, 'listBook').pipe(
      // tap(x => console.log(x)),
      catchError(tapError('addBookToUserList')),
      map(response => response.code === 0)
    )
  }
}
