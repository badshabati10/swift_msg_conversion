import {RefCodeTypeMaintComponent} from "../private/core-config/refcodetype-maint/refcodetype-maint.component";
import {RefCodeMaintComponent} from "../private/core-config/refcode-maint/refcode-maint.component";
import {MenuMaintenanceComponent} from "../private/core-config/menu-maintenance/menu-maintenance.component";
import { MessageIdMaintComponent } from "../private/core-config/message-id-maint/message-id-maint.component";

export class CoreConfigConstant {

  public static readonly CORE_CONFIG_COMPONENT_MAP: Map<string, any> = new Map([
    ['refCodeTypeMaint', {
      obj: RefCodeTypeMaintComponent
    }],
    ['refCodeMaint', {
      obj: RefCodeMaintComponent
    }],
    ['menu', {
      obj: MenuMaintenanceComponent
    }],
    ['msgComponent', {
      obj: MessageIdMaintComponent
    }],

  ])
}
