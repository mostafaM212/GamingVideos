"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TabsContainerComponent = void 0;
var core_1 = require("@angular/core");
var tab_component_1 = require("../tab/tab.component");
var TabsContainerComponent = /** @class */ (function () {
    function TabsContainerComponent() {
        var _this = this;
        this.tabs = new core_1.QueryList();
        this.selectTab = function (tab) {
            _this.tabs.forEach(function (tabItem) {
                tabItem.active = false;
            });
            tab.active = true;
            return false;
        };
    }
    TabsContainerComponent.prototype.ngAfterContentInit = function () {
        var _a;
        var activeTabs = (_a = this.tabs) === null || _a === void 0 ? void 0 : _a.filter(function (tab) { return tab.active; });
        if (!activeTabs || activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    __decorate([
        core_1.ContentChildren(tab_component_1.TabComponent)
    ], TabsContainerComponent.prototype, "tabs");
    TabsContainerComponent = __decorate([
        core_1.Component({
            selector: 'app-tabs-container',
            templateUrl: './tabs-container.component.html',
            styleUrls: ['./tabs-container.component.css']
        })
    ], TabsContainerComponent);
    return TabsContainerComponent;
}());
exports.TabsContainerComponent = TabsContainerComponent;
