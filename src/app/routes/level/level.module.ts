import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { Level2_1Component } from './level1_1/level2_1/level2_1.component';
import { Level2_2Component } from './level1_1/level2_2/level2_2.component';
import { Level1_2Component } from './level1_2/level1_2.component';
import { LevelRoutingModule } from './level-routing.module';

const COMPONENTS: any[] = [Level2_1Component, Level2_2Component, Level1_2Component];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, LevelRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class LevelModule {}
