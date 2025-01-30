import { TranslateService } from "@ngx-translate/core";
import { MrhBlock } from "../_models/socket-payload/mrh-block";
import { EventBusService } from "../_services/event-bus.service";
import { EventNamesConstant } from "../_constants/event-names.constant";

export class CommonUtil {
  static classInitializer(value) {
    if (value?.pristine) {
      return '';
    } else if (value?.invalid) {
      return 'is-invalid';
    } else if (value?.valid) {
      return 'is-valid'
    } else {
      return '';
    }
  }

  static isEmpty(val: any): boolean {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  static languageInit(translate: TranslateService, eventBus: EventBusService) {
    let languageCode = sessionStorage.getItem('langCode')
    if (languageCode === 'BAN') {
      translate.use('bn');
    } else {
      translate.use('en');
    }
    eventBus.getObservable(EventNamesConstant.LANGUAGE).subscribe(u => {
      translate.use(u.langValue.val);
    })
  }

  static mrhBlockToGrid(mrhBlock: MrhBlock) {
    let list = [];
    for (let i = 0; i < mrhBlock.dataBlock.length; i++) {
      let obj = {}
      for (let j = 0; j < mrhBlock.headerInfo.length; j++) {
        let key = mrhBlock.headerInfo[j];
        let value = mrhBlock.dataBlock[i][j];
        obj = { ...obj, [key]: value ? value : '' };
      }
      list.push(obj);
    }
    return list;
  }

  static gridToMrhBlock(list: any[], headerInfo: string[]) {
    let dataBlock = [];
    for (let item of list) {
      let rowData = [];
      for (let key of headerInfo) {
        rowData.push(item[key] ? item[key] : '');
      }
      dataBlock.push(rowData);
    }
    return dataBlock;
  }

  static funCodeDetails(value): string {
    switch (value) {
      case 'I': {
        return 'I - Inquiry';
      } case 'A': {
        return 'A - Add';
      } case 'D': {
        return 'D - Delete';
      } case 'U': {
        return 'U - Undelete';
      } case 'M': {
        return 'M - Modification';
      } case 'V': {
        return 'V - Verification';
      } case 'X': {
        return 'X - Cancel';
      }
      case 'C': {
        return 'C - Copy';
      }
      default: {
        return value;
      }
    }
  }

  static getFormattedDate(date: any): string {
    if (date) {
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return '';
  }

  static resizeImage(file: File, maxSize: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          let width = img.width;
          let height = img.height;

          const ratio = Math.sqrt(maxSize / (file.size || 1));
          if (ratio < 1) {
            width = width * ratio;
            height = height * ratio;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: file.type }));
            } else {
              reject(new Error('Canvas is empty'));
            }
          }, file.type);
        };
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  static camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  static jsonToMap(json: any): Map<string, any> {
    const map = new Map<string, any>();
    Object.keys(json).forEach(key => {
      map.set(key, json[key]);
    })
    return map;
  }

  static parseDate(dateString: string): Date | null {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return null;
  }

  static getHexConversion(input: string): string {
    let hex = '';
    for (let i = 0; i < input.length; i++) {
      hex += input.charCodeAt(i).toString(16);
    }
    return hex;
  }

  static formatCamelCase(str: string): string {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  }

  static convertNumberToBangla(inputString: string): string {
    const englishToBanglaMap = {
      '0': '০',
      '1': '১',
      '2': '২',
      '3': '৩',
      '4': '৪',
      '5': '৫',
      '6': '৬',
      '7': '৭',
      '8': '৮',
      '9': '৯'
    };

    return inputString.split('').map(char => {
      // Replace number with Bangla, or keep the original character
      return englishToBanglaMap[char] || char;
    }).join('');
  }

}
