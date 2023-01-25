import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevenirAgriculteurComponent } from './devenir-agriculteur.component';

describe('DevenirAgriculteurComponent', () => {
  let component: DevenirAgriculteurComponent;
  let fixture: ComponentFixture<DevenirAgriculteurComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DevenirAgriculteurComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevenirAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
