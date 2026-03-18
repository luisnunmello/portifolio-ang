import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Project } from '../../../types/project.type';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollService } from '../../../service/scroll/scroll.service';
import { RouterLink } from '@angular/router';
import { enviroment } from '../../../../environment';

@Component({
  selector: 'app-project-carousel',
  imports: [RouterLink, TranslateModule],
  templateUrl: './project-carousel.component.html',
  styleUrl: './project-carousel.component.css'
})
export class ProjectCarouselComponent implements OnInit, OnDestroy {

  @Output()
  iCurrentProject: EventEmitter<number> = new EventEmitter<number>();

  @Input("projects")
  projects: Project[] = [];

  @ViewChild("projectPageHolder", {static: true}) projectPageHolder!: ElementRef<HTMLDivElement>;
  projectPage?: HTMLDivElement = undefined;

  currentProject?: Project = undefined;

  iProjetoAtual = 0;
  nextInterval: any;
  intervalo = 0;
  isTouching = false;
  isDragging = false;
  posInicialDrag = { x: 0, y: 0 };
  posAtualDrag = 0;
  tempoParaTrocar = 5000;

  isInformationToggled = false;

  urlImagens = `${enviroment.urlBackend}/image?id=`;

  constructor(
    private translate: TranslateService,
    private scroll: ScrollService,
  ) {
    // this.translate.setDefaultLang("pt");
    this.iCurrentProject.emit(this.iProjetoAtual);
  }

  ngOnInit(): void {
    this.criarIntervalo();
    this.iCurrentProject.emit(this.iProjetoAtual);
    console.log(this.projectPageHolder);
    this.projectPage = this.projectPageHolder.nativeElement;
  }

  ngOnDestroy(): void {
    this.pararIntervalo();
  }

  toggleInformation() {
    this.isInformationToggled = !this.isInformationToggled;
  }

  changeProject(iProject: number) {
    this.iProjetoAtual = iProject;
    this.currentProject = this.projects[this.iProjetoAtual];
    this.iCurrentProject.emit(this.iProjetoAtual);
    const pageButton = (this.projectPageHolder.nativeElement.querySelector(`#page-${iProject}`));
    pageButton?.scrollIntoView({behavior: "smooth", block: "nearest"});
  }

  proximoProjeto(): void {
    this.intervalo = 0;
    this.changeProject((this.iProjetoAtual + 1) % this.projects.length);
  }

  anteriorProjeto(): void {
    this.intervalo = 0;
    this.changeProject(this.iProjetoAtual === 0 ? this.projects.length - 1 : this.iProjetoAtual - 1);
  }

  pararIntervalo(): void {
    clearInterval(this.nextInterval);
  }

  criarIntervalo(): void {
    // this.pararIntervalo();
    // const delay = 100;
    // this.nextInterval = setInterval(() => {
    //   this.intervalo += delay;
    //   if (this.intervalo >= this.tempoParaTrocar) {
    //     this.proximoProjeto();
    //     this.intervalo = 0;
    //   }
    // }, delay);
  }

  onTouchStart(event: TouchEvent): void {
    return;
    this.pararIntervalo();
    this.posInicialDrag = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    this.posAtualDrag = event.touches[0].clientX;
    this.isTouching = true;
    this.scroll.lockScroll();
  }

  @HostListener('window:touchmove', ['$event'])
  touchMoveEvent(event: TouchEvent): void {
    return;
    if (this.isTouching) {
      this.posAtualDrag = event.touches[0].clientX;
    }
  }

  @HostListener('window:touchend')
  onTouchEnd(): void {
    return;
    this.isTouching = false;
    const diffParaMudar = 100;
    const diff = this.posAtualDrag - this.posInicialDrag.x;

    if (this.isDragging) {
      if (diff > diffParaMudar) {
        this.anteriorProjeto();
      } else if (diff < -diffParaMudar) {
        this.proximoProjeto();
      }
    }
    this.isDragging = false;
    this.scroll.unlockScroll();
    this.posAtualDrag = 0;
    this.posInicialDrag = { x: 0, y: 0 };
    this.criarIntervalo();
  }
}
