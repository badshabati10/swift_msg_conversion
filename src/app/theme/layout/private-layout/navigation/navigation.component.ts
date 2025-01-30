// Angular import
import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem } from "./navigation-item";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../../../_services";
import { MenuService } from "../../../../_services/menu.service";
import { take } from "rxjs";
import { ErrorCodeConstant } from "../../../../_constants/error-code.constant";
import { CoreConfigConstant } from "../../../../_constants/core-config.constant";
import { EventNamesConstant } from 'src/app/_constants/event-names.constant';
import { EventBusService } from 'src/app/_services/event-bus.service';
import { CommonUtil } from 'src/app/_helpers/common.util';
import { TabsProvider } from 'src/app/theme/shared/components/tabs/tabs.provider';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  // public props
  hasInitialized = false;
  @Input() accessType;
  roles = [];
  windowWidth: number;
  hashmap = new Map<string, Component>();
  path;
  superAdminNavigationItems: NavigationItem[];

  constructor(private route: ActivatedRoute,
    private authService: AuthenticationService,
    private menuService: MenuService,
    private eventBus: EventBusService,
    private router: Router,
    private tabProvider: TabsProvider) {
  }

  // public method

  // ngOnInit(): void {
  //   this.route.url.subscribe(route => {
  //     this.path = route[0].path
  //     this.authService.user.pipe(take(1)).subscribe(auth => {
  //       let moduleList = auth.modules.toString().split(',');
  //       if (this.path === 'core-config' && moduleList.find(k => k.split('!')[0] === 'CCONF')) {
  //         let moduleValue = moduleList.find(k => k.split('!')[0] === 'CCONF');
  //         this.menuService.getMenusByModule(this.path, moduleValue.split('!')[1])
  //           .pipe(take(1)).subscribe({
  //           next: (menu) => {
  //             this.menuGenerator(menu, CoreConfigConstant.CORE_CONFIG_COMPONENT_MAP)
  //           }, error: (err) => {
  //             if (err.error.errorCode && err.error.errorCode === ErrorCodeConstant.PASSWORD_CHANGE_SCREEN_ERROR_CODE) {
  //               this.router.navigate(['/private/change-password']);
  //             }
  //           }
  //         });
  //       } else if (this.path === 'biome-reg' && moduleList.find(k => k.split('!')[0] === 'BIOME')) {
  //         let moduleValue = moduleList.find(k => k.split('!')[0] === 'BIOME');
  //         this.menuService.getMenusByModule(this.path, moduleValue.split('!')[1])
  //           .pipe(take(1)).subscribe({
  //           next: (menu) => {
  //             this.menuGenerator(menu, BiomeRegConstant.BIOME_REG_COMPONENT_MAP)
  //           }, error: (err) => {
  //             if (err.error.errorCode && err.error.errorCode === ErrorCodeConstant.PASSWORD_CHANGE_SCREEN_ERROR_CODE) {
  //               this.router.navigate(['/private/change-password']);
  //             }
  //           }
  //         });
  //       }
  //     });
  //   });
  // }


  ngOnInit(): void {
    this.route.url.subscribe(route => {
      this.path = route[0].path
      this.authService.user.pipe(take(1)).subscribe(auth => {
        let moduleList = auth.modules.toString().split(',');
        const langObj$ = this.eventBus.getObservable(EventNamesConstant.LANGUAGE);
        if (this.path === 'core-config' && moduleList.find(k => k.split('!')[0] === 'CCONF')) {
          let moduleValue = moduleList.find(k => k.split('!')[0] === 'CCONF');
          console.log(moduleValue);
          langObj$.subscribe(lang => {
            this.menuService.getMenusByModule(this.path, moduleValue.split('!')[1], lang.langValue)

              .pipe(take(1)).subscribe({
                next: (menu) => {
                  this.menuGenerator(menu, CoreConfigConstant.CORE_CONFIG_COMPONENT_MAP)
                }, error: (err) => {
                  if (err.error.errorCode && err.error.errorCode === ErrorCodeConstant.PASSWORD_CHANGE_SCREEN_ERROR_CODE) {
                    this.router.navigate(['/private/change-password'], { state: { hasForced: true } });
                  }
                }
              });
          });
        } else if (this.path === 'biome-reg' && moduleList.find(k => k.split('!')[0] === 'BIOME')) {
          let moduleValue = moduleList.find(k => k.split('!')[0] === 'BIOME');
          console.log(moduleValue);
          langObj$.subscribe(lang => {
            this.menuService.getMenusByModule(this.path, moduleValue.split('!')[1], lang.langValue)
              .pipe(take(1)).subscribe({
                next: (menu) => {
                  //this.menuGenerator(menu, BiomeRegConstant.BIOME_REG_COMPONENT_MAP)
                }, error: (err) => {
                  if (err.error.errorCode && err.error.errorCode === ErrorCodeConstant.PASSWORD_CHANGE_SCREEN_ERROR_CODE) {
                    this.router.navigate(['/private/change-password'], { state: { hasForced: true } });
                  }
                }
              });
          });
        }
      });
    });
  }


  menuGenerator(menuListObject, componentHasMap) {
    let layerZero = menuListObject?.layerZero;
    let layerOne = menuListObject?.layerOne;
    let layerTwo = menuListObject?.layerTwo;
    let navigation = [];
    for (let i = 0; i < layerZero.length; i++) {
      let objectLayerZero = layerZero[i];
      let objectsLayerOne: [] = layerOne.filter(u => u.parentId === objectLayerZero.id);
      let newObjectsLayerOne = [];
      for (let j = 0; j < objectsLayerOne.length; j++) {
        let objectLayerOne: any = objectsLayerOne[j];
        let objectsLayerTwo = layerTwo.filter(v => v.parentId === objectLayerOne.id).map(k => {
          return { ...k, component: componentHasMap.get(k.component)?.obj }
        })
        objectLayerOne = {
          ...objectLayerOne,
          children: objectsLayerTwo
        }
        newObjectsLayerOne.push(objectLayerOne)
      }
      objectLayerZero = {
        ...objectLayerZero,
        children: newObjectsLayerOne
      }
      navigation.push(objectLayerZero);
    }
    this.superAdminNavigationItems = navigation;
    this.setActiveTabTitle();
    this.hasInitialized = true;
  }

  setActiveTabTitle() {
    let activeTabItems = this.tabProvider.getActiveTab();
    // maximum opened tab 3
    for (let i = 0; i < activeTabItems.length; i++) {
      // traverse navigation items
      this.superAdminNavigationItems.forEach((firstLayerItems) => {
        firstLayerItems.children.forEach((secondLayerItems) => {
          let thirdLayerItems = secondLayerItems.children;
          let item = thirdLayerItems.find(v => v.id === activeTabItems[i].id);
          if (!CommonUtil.isEmpty(item))
            activeTabItems[i].title = item.title;
        });
      })
    }
  }
}
