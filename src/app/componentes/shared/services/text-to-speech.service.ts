import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, Observable, Subject, switchMap } from 'rxjs';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  private URL: string = 'http://127.0.0.1:8080/texttospeech';
  private language: string = '';
  private audio: HTMLAudioElement | null = null;
  private textSubject = new Subject<string>();
  private isAudioNaoInterrompivel: boolean;

  constructor(
    private http: HttpClient,
    private interService: InternacionalizacaoService
  ) {
    this.language  = this.interService.getIdiomaSelecionado();
    this.textSubject.pipe(
      debounceTime(500),
      switchMap(text => this.synthesizeSpeech(text))
    ).subscribe(response => {
      const audioContent = response.audioContent;
      if(audioContent) {
        const audioBlob = this.base64ToBlob(audioContent, 'audio/mp3');
        const audioUrl = URL.createObjectURL(audioBlob);
        this.audio = new Audio(audioUrl);
        this.audio.addEventListener('canplaythrough', () => this.audio?.play());
        this.audio.addEventListener('ended', () => {
          if(this.isAudioNaoInterrompivel) {
            this.isAudioNaoInterrompivel = false;
          }
        })
      }
    });
  }

  public base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mimeType });
  }

  private synthesizeSpeech(text: string): Observable<{ audioContent: string }> {
    const body = {
      text: text,
      language: this.language
    }
    return this.http.post<{ audioContent: string }>(this.URL, body, { responseType: 'json' });
  }

  public lerTexto(texto: string, isAudioNaoInterrompivel: boolean = false) {
    if(localStorage.getItem('sound') == 'true' && texto != '') {
      if(!this.isAudioNaoInterrompivel) {
        this.pararLeitura();
        this.isAudioNaoInterrompivel = isAudioNaoInterrompivel;
        this.textSubject.next(texto);
      }
    }
  }

  public pararLeitura() {
    if (this.audio && !this.isAudioNaoInterrompivel) {
      this.audio.pause();
    }
  }

}
