import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthService, AuthHttpProvider } from './auth';
import { SessionRepository } from './session';
import { UserRepository } from './user';
import { FileComponent, FileRepository, FileService } from './file';
import { SlideRepository } from './slide';
import { AuthorRepository } from './author';
import { GenreRepository } from './genre';

const ADRENALIVRE_COMPONENTS = [
    FileComponent
];

const ADRENALIVRE_PROVIDERS = [
    AuthHttpProvider.provide(),
    SessionRepository,
    AuthService,
    UserRepository,
    FileRepository,
    FileService,
    SlideRepository,
    AuthorRepository,
    GenreRepository
];

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    exports: ADRENALIVRE_COMPONENTS,
    declarations: ADRENALIVRE_COMPONENTS,
    providers: ADRENALIVRE_PROVIDERS,
})
export class AdrenalivreAPIModule {
}
