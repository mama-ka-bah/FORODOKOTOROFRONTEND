import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPhaseCultiveComponent } from './detail-phase-cultive.component';

describe('DetailPhaseCultiveComponent', () => {
  let component: DetailPhaseCultiveComponent;
  let fixture: ComponentFixture<DetailPhaseCultiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPhaseCultiveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPhaseCultiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
