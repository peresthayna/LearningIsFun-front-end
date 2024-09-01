import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternacionalizacaoService } from '../../../main/internacionalizacao/internacionalizacao.service';
import { es_es } from '../../../main/internacionalizacao/es_es';
import { en_us } from '../../../main/internacionalizacao/en_us';
import { pt_br } from '../../../main/internacionalizacao/pt_br';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  private apiUrl: string = 'https://texttospeech.googleapis.com/v1/text:synthesize';
  private language: string = '';
  private name: string = '';
  private audio: HTMLAudioElement | null = null;

  constructor(
    private http: HttpClient,
    private interService: InternacionalizacaoService) {
    this.language  = this.getIdioma();
    this.name  = this.getIdiomaName();
  }

  getIdioma() {
    let idioma = this.interService.getIdioma();
    switch (idioma) {
      case pt_br: return 'pt-BR';
      case en_us: return 'en-US';
      case es_es: return 'es-ES';
      default: return 'pt-BR';
    }
  }

  getIdiomaName() {
    let idioma = this.interService.getIdioma();
    switch (idioma) {
      case pt_br: return 'pt-BR-Standard-C';
      case en_us: return 'en-US-Standard-C';
      case es_es: return 'es-ES-Standard-C';
      default: return 'pt-BR-Standard-C';
    }
  }

  synthesizeSpeech(text: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ya29.c.c0ASRK0GYLoZ_ieIWZE-MuJLrQqiBmEs7NbSJGQF28cbryrKyfBo7o_oYgkSEC7zH3PXls8Outvi_MNZQ7pZzCf9Kci6yAoNBCGM1GD9I4vM17uVW6ofJOX9ZVjVF7PXY80PZFsU4AqETYjLtm1sv1-zGwjNdEwCwcAIMF8Ov6GRDMe77mD8Rf4r_zUv0PVT8_zvkis8RTp2Uhvdtowyoi0NI8ynMWYR1zy9cF5mqnnA5vbUuStkSpnJmVvhdNCNioD-NK_DcmSTWFLb4_nKdMYCcwt9ZI9VI8mT-BqERDnkudEKAKMXj1PiYba6-cwmA62R4REHjmUTnLGoIJ7DlJ4UzYPqQr4eKxTf-9VJnLy-Vi8AkHuY-6_viFRQ-FFc_fnaE1H397Ch20YyVkU3R7WQcYMzFqc1koQcc542RU_Fj38t1YtRvQB05JIwJm_Yap8ysbl_1Ww1YR-_X4mRYud8RvyXR3Yktxp9wiZ0famU5cuou5IdgM0pzSgvQrooegYJdeMzdczXdI72-uWWRsjiJIc9S-2pfU3Zpxu6lYpqpxkpoppn3du3kcXZJaQOYcj4xt2bizsYgX_q0VxpSi-pWx_8iq7BoUB-JW-2hprcg2vvY66dbJ_S0dyqwfJb0m-BoZs3fO-db4ieIStOctlWwetIIfc3j341Zagcfb101d9shJuie07rMpyXboZV35aniilh8i9tmd2gcbv7Ya_ttn929_ywXoMlbSaWV1zxdyl4bZ5hRgWg0qZynY_ZaozWf1fJjMtFdiwIlaRfs_3YlzuhQsrRUswa_66Yxc13flFpn09kVUWt_gzzwv3_x3uS_dJkc8V80ovkrxWpvk8pXBwruJhzoOZ1raw1_92z75v1wZsayVR5cJU3xx5sRXvYtSIrUo9cvSY56pYkkWtYe1nfrmO4Z_QczOd5egbguJrxBtxXf4Q866Vu-WiQY2a6BSuk7jYZR8mZUVzRz76_pcJb-SkxIY2xFqJtorknwY59lz9Jawjdz',
      'Content-Type': 'application/json; charset=utf-8'
    });

    const body = {
      input: { text },
      voice: {
        languageCode: this.language,
        name: this.name,
        ssmlGender: 'FEMALE'
      },
      audioConfig: { audioEncoding: 'MP3' }
    };

    return this.http.post(this.apiUrl, body, { headers, responseType: 'json' });
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

  lerTexto(texto: string) {
    if(localStorage.getItem('sound') == "true") {
      this.synthesizeSpeech(texto).subscribe(response => {
        const audioContent = response.audioContent;
        if (audioContent) {
          const audioBlob = this.base64ToBlob(audioContent, 'audio/mp3');
          const audioUrl = URL.createObjectURL(audioBlob);
          this.audio = new Audio(audioUrl);

          this.audio.addEventListener('canplaythrough', () => {
            this.audio?.play().catch(error => {
              console.error('Erro ao tentar reproduzir o áudio:', error);
            });
          });
        } else {
          console.error('No audio content received');
        }
      }, error => {
        console.error('Error:', error);
      });
    }
  }

  pararLeitura() {
    if (this.audio) {
      this.audio.pause();
    }
  }

}
