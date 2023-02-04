"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ModalService = void 0;
var core_1 = require("@angular/core");
var ModalService = /** @class */ (function () {
    function ModalService() {
        var _this = this;
        this.modals = [];
        this.register = function (id) {
            _this.modals.push({
                id: id,
                visible: false
            });
        };
        this.unregister = function (id) {
            _this.modals = _this.modals.filter(function (modal) { return modal.id !== id; });
        };
        this.isModalOpen = function (id) {
            var _a;
            return !!((_a = _this.modals.find(function (modal) { return modal.id == id; })) === null || _a === void 0 ? void 0 : _a.visible);
        };
        this.toggleModal = function (id) {
            var modal = _this.modals.find(function (modal) { return modal.id == id; });
            if (modal) {
                modal.visible = !modal.visible;
            }
        };
    }
    ModalService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ModalService);
    return ModalService;
}());
exports.ModalService = ModalService;
