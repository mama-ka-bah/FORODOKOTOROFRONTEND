import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterPhaseCultiveComponent } from './ajouter-phase-cultive.component';

describe('AjouterPhaseCultiveComponent', () => {
  let component: AjouterPhaseCultiveComponent;
  let fixture: ComponentFixture<AjouterPhaseCultiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterPhaseCultiveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterPhaseCultiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
