import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {functionCodeNameConstant} from "../../../../../_constants/function-code-name.constant";

@Injectable({providedIn: "root"})
export class NavigationService{

  private _getMenuEvent$ = new BehaviorSubject<any>([]);
  get getMenuEvent$(): BehaviorSubject<any> {
    return this._getMenuEvent$;
  }

  getPermittedOptions(){
    let permiOptionArray = [];
    // this.getMenuEvent$.asObservable().subscribe(u => console.log(u));
    let objI = {};
    objI["optionValue"] = 'I';
    objI["optionText"] = functionCodeNameConstant.I;
    permiOptionArray.push(objI);
    let splittedArr = this.getMenuEvent$.value.optionPermission.split(",");
    for(let i=0; i<splittedArr.length; i++){
      let obj = {}
      obj["optionValue"] = splittedArr[i].split('-')[0];
      obj["optionText"] = functionCodeNameConstant[splittedArr[i].split('-')[0]];
      permiOptionArray.push(obj);
    }

    console.log(permiOptionArray);
    return permiOptionArray;
  }

  getMenuId(){
    return this.getMenuEvent$.value.id;
  }
}
