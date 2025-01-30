import {Injectable} from "@angular/core";
import Swal from "sweetalert2";

@Injectable({providedIn: 'root'})
export class AlertService {
  public successAlert(title){
    return Swal.fire({
      position: "top-end",
      icon: "success",
      title: `<strong>${title}</strong>`,
      showConfirmButton: false,
      timer: 1500
    });
  }

  public warningAlert(message){
    return Swal.fire({
      title: '<strong>Warning!!!</strong>',
      text: message,
      icon: "warning"
    });
  }

  public errorAlert(message, title= "Oops"){
    return Swal.fire({
      icon: "error",
      title: `<strong>${title}</strong>`,
      text: message,
    });
  }

  public confirmationAlert( text, title= "Are you sure?",confirmationButtonText= "Confirm"){
    return Swal.fire({
    title: `<strong>${title}</strong>`,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmationButtonText
  })
  }

  public showInformationAlert(title){
    return Swal.fire({
      icon: "success",
      title: `<strong>${title}</strong>`,
    });
  }
}
