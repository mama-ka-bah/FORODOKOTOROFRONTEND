import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangerMotDePasseComponent } from './changer-mot-de-passe.component';

describe('ChangerMotDePasseComponent', () => {
  let component: ChangerMotDePasseComponent;
  let fixture: ComponentFixture<ChangerMotDePasseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangerMotDePasseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangerMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
