import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface IState {
  documentPartType: string;
  outputFileType: string;
  filename: string;
  url: string;
}

interface IDTO {
  content: string;
  url: string;
}

@Injectable({providedIn: 'root'})
export class ScrapperService {

  private readonly downloadUrl;
  private readonly showUrl;
  public pojo: IState;

  constructor(private http: HttpClient) {
    this.downloadUrl = 'http://localhost:8080/testing-lab2/download';
    this.showUrl = 'http://localhost:8080/testing-lab2/show';
    this.pojo = {documentPartType: '-text', outputFileType: '-txt', filename: '', url: ''};
  }

  public setUrl(url: string) {
    this.pojo.url = url;
  }

  public setContentType(contentType: string) {
    this.pojo.documentPartType = contentType;
  }

  public setFileType(fileType: string) {
    this.pojo.outputFileType = fileType;
  }

  public setFileName(fileName: string) {
    this.pojo.filename = fileName;
  }

  public onSee(): Observable<IDTO> {
    return this.http.get<IDTO>(this.makeShowLink(this.showUrl));
  }

  public onDownload(): Observable<any> {
    return this.http.get<any>(this.makeDownloadLink(), {observe: 'response' as 'body'});
  }

  private makeShowLink(url: string): string {
    return url + '?documentPartType=' + this.pojo.documentPartType + '&url=' + this.pojo.url;
  }

  private makeDownloadLink(): string {
    return this.downloadUrl + '?documentPartType=' + this.pojo.documentPartType
      + '&outputFileType=' + this.pojo.outputFileType
      + '&filename=' + this.pojo.filename
      + '&url=' + this.pojo.url;
  }

  parseFilename() {
    let filename = this.pojo.filename;
    const url = this.pojo.url;
    const outputFileType = this.pojo.outputFileType;
    if (filename === '') {
      filename = url.split('\\').join('').split('/').join('');
    }
    const regex =  new RegExp('^.*\.' + outputFileType.slice(1) + '$');
    if (filename.match(regex) !== null) {
      return filename;
    } else {
      return filename + '.' + outputFileType.slice(1);
    }
  }
}
