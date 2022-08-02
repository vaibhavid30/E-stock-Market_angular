import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {


  url = "http://localhost:8081/market/stock";

  constructor(private _http: HttpClient) { }

  public getStockByCompanyID(companyID: string): Observable<any> {
    return this._http.get<any>(this.url + "/getStock/" + companyID);
  }

  public addStock(stockName: any, stockPrice: any, companyID: string) {
    const body = {
      stockName: stockName,
      stockPrice: stockPrice
    }
    return this._http.post<any>(this.url + '/add/' + companyID, body);
  }

  public updateStockPrice(stockPrice: any, stockId: any) {
    const body = {
      stockPrice: stockPrice
    }
    console.log(body.stockPrice, stockId)
    return this._http.put<any>(this.url + '/updateStockPrice/' + stockId, body);
  }

  public getStockDetails(currentStockID: string, startDate: string, endDate: string)  {
    const body = {
      stockId: currentStockID,
      date: startDate,
      endDate: endDate
    }
    console.log(body)
    return this._http.post<any>(this.url + '/findStockHistory', body);
  }

}
