import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFavoritePage } from './product-favorite.page';

describe('ProductFavoritePage', () => {
  let component: ProductFavoritePage;
  let fixture: ComponentFixture<ProductFavoritePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductFavoritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
