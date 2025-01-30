import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EncodeUtil {

  stringFromCharCode = String.fromCharCode;
  byteCount : any;
  byteIndex : any;
  byteArray : any;
  constructor(private http: HttpClient) { }

//this function would convert the hext string into UniCode.
  utf8decode(byteString) {
    this.byteArray = this.ucs2decode(byteString);
    this.byteCount = this.byteArray.length;
    this.byteIndex = 0;
    var codePoints = [];
    var tmp;
    while ((tmp = this.decodeSymbol()) !== false) {
      codePoints.push(tmp);
    }
    return this.ucs2encode(codePoints);
  }

   public ucs2decode(string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    var value;
    var extra;
    while (counter < length) {
      value = string.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        extra = string.charCodeAt(counter++);
        if ((extra & 0xFC00) == 0xDC00) {
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }

   public decodeSymbol() {
    var byte1;
    var byte2;
    var byte3;
    var byte4;
    var codePoint;
    if (this.byteIndex > this.byteCount) {
      throw Error('Invalid byte index');
    }
    if (this.byteIndex == this.byteCount) {
      return false;
    }
    byte1 = this.byteArray[this.byteIndex] & 0xFF;
    this.byteIndex++;
    if ((byte1 & 0x80) == 0) {
      return byte1;
    }
    if ((byte1 & 0xE0) == 0xC0) {
      byte2 = this.readContinuationByte();
      codePoint = ((byte1 & 0x1F) << 6) | byte2;
      if (codePoint >= 0x80) {
        return codePoint;
      } else {
        throw Error('Invalid continuation byte');
      }
    }
    if ((byte1 & 0xF0) == 0xE0) {
      byte2 = this.readContinuationByte();
      byte3 = this.readContinuationByte();
      codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
      if (codePoint >= 0x0800) {
        this.checkScalarValue(codePoint);
        return codePoint;
      } else {
        throw Error('Invalid continuation byte');
      }
    }
    if ((byte1 & 0xF8) == 0xF0) {
      byte2 = this.readContinuationByte();
      byte3 = this.readContinuationByte();
      byte4 = this.readContinuationByte();
      codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) | (byte3 << 0x06) | byte4;
      if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
        return codePoint;
      }
    }
    throw Error('Invalid UTF-8 detected');
  }

   public readContinuationByte() {
    if (this.byteIndex >= this.byteCount) {
      throw Error('Invalid byte index');
    }
    var continuationByte = this.byteArray[this.byteIndex] & 0xFF;
    this.byteIndex++;
    if ((continuationByte & 0xC0) == 0x80) {
      return continuationByte & 0x3F;
    }
    throw Error('Invalid continuation byte');
  }

   public checkScalarValue(codePoint) {
    if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
      throw Error('Lone surrogate U+' + codePoint.toString(16).toUpperCase() + ' is not a scalar value');
    }
  }

   /*public utf8encode(string) {
    var codePoints = this.ucs2decode(string);
    var length = codePoints.length;
    var index = -1;
    var codePoint;
    var byteString = '';
    while (++index < length) {
      codePoint = codePoints[index];
      byteString += this.encodeCodePoint(codePoint);
    }
    return byteString;
  }*/

   public ucs2encode(array) {
    var length = array.length;
    var index = -1;
    var value;
    var output = '';
    while (++index < length) {
      value = array[index];
      if (value > 0xFFFF) {
        value -= 0x10000;
        output += this.stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }
      output += this.stringFromCharCode(value);
    }
    return output;
  }

}
