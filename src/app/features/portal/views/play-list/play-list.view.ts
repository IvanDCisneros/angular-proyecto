import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { CategoryService } from '../../commons/services/category.service';
import { PlayListService } from '../../commons/services/play-list.service';
import { CategoryModel } from '../../models/category.model';
import { IdsModel } from '../../models/ids.model';
import { PlayListModel } from '../../models/play-list.model';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.view.html',
  styleUrls: ['./play-list.view.scss']
})
export class PlayListView implements OnInit {

  @ViewChild('teamDropdown') teamDropdown!: MatSelect;
  categorias!: CategoryModel[];
  ids: IdsModel[] = [];
  playListGroup!: FormGroup;
  cancion: number = 0;
  audioObj = new Audio();
  currentTime: string = "00:00";
  duration: string = "00:00";
  totalSong: number = 0;
  seek: number = 0;
  isFirts: boolean = false;
  isPlaying: boolean = false;
  audioEvents = ["ended", "error", "play", "playing", "pause", "timeupdate", "canplay", "loadedmetadata", "loadstart"]
  files!: PlayListModel[];
  nombreCancion: string = "";
  nombreArtista: string = "";
  rutaImagen: string= "";
  idiomaCancion: string= "";
  seleccionados!: number[];
  seleccionarTodos: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private playListService: PlayListService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.playListGroup = this.formBuilder.group(
      {
        idsCategorias: [''],
      });

    this.categoryService.getAll().subscribe(data => {
      this.categorias = data;
    });
    this.rutaImagen = "assets/img/logoMusica.jfif"
  }

  playPause() {
    if(this.files && this.files.length > 0)
    {
      if (this.isFirts === false) {
        this.openFile();
        this.isFirts = true;
        this.isPlaying = true;
      }
      else {
        if (this.isPlaying) {
          this.audioObj.pause();
          this.isPlaying = false;
        }
        else {
          this.audioObj.play();
          this.isPlaying = true;
        }
      }
    }
    else
    this.toastr.error("Debe cargar canciones de almneos un idioma.", "Lo Sentimos!!!");
  }

  openFile() {
    this.streamObserver(this.files[this.cancion].urlCancion).subscribe(event => { });
    this.datosCancion();
  }

  datosCancion(){
    this.rutaImagen = this.files[this.cancion].urlImagen;
    this.nombreCancion = this.files[this.cancion].nombreCancion;
    this.nombreArtista = this.files[this.cancion].nombreArtista;
    this.idiomaCancion = this.files[this.cancion].nombreCategoria;
  }

  setVolume(value: string) {
    this.audioObj.volume = Number(value)/100;
  }

  setSeekTo(value: string) {
    this.audioObj.currentTime = Number(value);
  }

  streamObserver(url: string) {
    return new Observable(observer => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
      const handler = (event: Event) => {
        this.totalSong = this.audioObj.duration;
        this.seek = this.audioObj.currentTime;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);
      }
      this.addEvent(this.audioObj, this.audioEvents, handler)

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvent(this.audioObj, this.audioEvents, handler);
      }
    });
  }

  addEvent(obj: any, events: string[], handler: any) {
    events.forEach(event => {
      obj.addEventListener(event, handler)
    });
  }

  removeEvent(obj: any, events: string[], handler: any) {
    events.forEach(event => {
      obj.removeEventListener(event, handler)
    });
  }

  timeFormat(time: any, format = "mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  previousSound() {
    this.audioObj.pause;

    if (this.cancion > 0) {
      this.cancion = this.cancion - 1
      this.datosCancion();
      this.audioObj.src = this.files[this.cancion].urlCancion
      this.audioObj.load();
      this.audioObj.play();
    }
  }

  nextSound() {
    this.audioObj.pause;

    if (this.cancion < this.files.length - 1) {
      this.cancion = this.cancion + 1
      this.datosCancion();
      this.audioObj.src = this.files[this.cancion].urlCancion
      this.audioObj.load();
      this.audioObj.play();
    }
  }

  //stopSound() {
  //  this.audio.pause();
  //  this.audio.currentTime = 0;
  //}

  buscarPlayList() {
    this.ids = [];
    if(this.seleccionados && this.seleccionados.length > 0)
    {
      this.seleccionados.forEach(element => {
        this.ids.push({id: element}); 
      });
      this.playListService.ObtenerPlayListPorIdCategorias(this.ids).subscribe(data => {
        if(data.length > 0)
        {
          this.toastr.success("Se cargaron " + data.length + " canciones.", "Información");
          this.files = data;
          this.cancion = 0;
          this.isFirts = false;
          this.playPause();
        }
        else
          this.toastr.error("El idioma o idiomas seleccionados no poseen canciones.", "Lo Sentimos!!!");
      });
    }
    else
    {
      this.toastr.error("Debe seleccionar al menos un idioma.", "Lo Sentimos!!!");
    }
  }

  selectAll(){
    this.seleccionarTodos = false;
    this.teamDropdown.options.forEach(element =>{
      element.select();
      });
  }

  deselectAll(){
    this.seleccionarTodos = true;
    this.teamDropdown.options.forEach(element =>{
      element.deselect();
      });
  }
}

