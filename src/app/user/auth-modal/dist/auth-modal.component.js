"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModalComponent = void 0;
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var AuthModalComponent = /** @class */ (function () {
    function AuthModalComponent(modalService) {
        this.modalService = modalService;
    }
    AuthModalComponent.prototype.ngOnInit = function () {
        this.modalService.register('auth');
        console.log(this.modalService.isModalOpen('auth') + '');
    };
    AuthModalComponent.prototype.ngOnDestroy = function () {
        this.modalService.unregister('auth');
    };
    AuthModalComponent = __decorate([
        core_1.Component({
            selector: 'app-auth-modal',
            templateUrl: './auth-modal.component.html',
            styleUrls: ['./auth-modal.component.css'],
            animations: [
                animations_1.trigger('opacityAnimation', [
                    animations_1.state('true', animations_1.style({
                        opacity: 1
                    })),
                    animations_1.state('false', animations_1.style({
                        opacity: 0
                    })),
                    animations_1.transition('false<=>true', animations_1.animate('200ms ease-in')),
                ]),
            ]
        })
    ], AuthModalComponent);
    return AuthModalComponent;
}());
exports.AuthModalComponent = AuthModalComponent;
