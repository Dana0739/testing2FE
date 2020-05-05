import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ScrapperService } from '../shared/scrapper.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-scrapper-form',
  templateUrl: './scrapper-form.component.html',
  styleUrls: ['./scrapper-form.component.css']
})
export class ScrapperFormComponent implements OnInit {

  @Output() OnShow = new EventEmitter<string>();

  constructor(private scrapperService: ScrapperService) { }

  ngOnInit(): void {
    document.getElementById('file-type-radio-txt').click();
    document.getElementById('content-type-radio-text').click();
  }

  onSetUrl(event: any): void {
    this.scrapperService.setUrl(event.target.value);
  }

  onSetContentType(event: any): void {
    this.scrapperService.setContentType(event.target.value);
  }

  onSetFileType(event: any): void {
    this.scrapperService.setFileType(event.target.value);
  }

  onSetFileName(event: any): void {
    this.scrapperService.setFileName(event.target.value);
  }

  onClickSee(): void {
    this.scrapperService.onSee().subscribe(response => {
      console.log('Scrapper got this response from BE: ');
      console.log(response);
      this.OnShow.emit(response.content);
    });
  }

  onClickDownload(): void {
    this.scrapperService.onDownload().subscribe(response => {
      if (response.body !== '' || response.body !== '') {
        console.log('Scrapper got this response from BE: ');
        console.log(response);
        const filename = this.scrapperService.parseFilename();
        console.log('Downloaded file name: ');
        console.log(filename);
        this.saveFile(response.body, filename);
      } else {
        console.error('Scrapper got EMPTY response from BE!');
      }
    });
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'text/csv; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
  }
}
