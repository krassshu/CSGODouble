import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { DepositComponent } from './deposit/deposit.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './provably-fair/details/details.component';
import { ProvablyFairComponent } from './provably-fair/provably-fair.component';
import { SupportComponent } from './support/support.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'provably-fair', component: ProvablyFairComponent },
  { path: 'provably-fair/:lottery', component: DetailsComponent },
  { path: 'affiliates', component: AffiliatesComponent },
  { path: 'support', component: SupportComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
