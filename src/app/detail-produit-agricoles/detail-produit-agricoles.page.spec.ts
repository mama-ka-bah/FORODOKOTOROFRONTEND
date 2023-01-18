import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailProduitAgricolesPage } from './detail-produit-agricoles.page';

describe('DetailProduitAgricolesPage', () => {
  let component: DetailProduitAgricolesPage;
  let fixture: ComponentFixture<DetailProduitAgricolesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProduitAgricolesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailProduitAgricolesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
