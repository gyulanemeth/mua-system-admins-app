import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export default function () {
  async function confirmAlert (msg) {
    return Swal.fire({
      title: 'Are you sure?',
      text: msg,
      showDenyButton: true,
      confirmButtonText: 'yes',
      denyButtonText: 'cancel'
    })
  }

  async function message (title, text) {
    return Swal.fire({
      title,
      text,
      showDenyButton: true,
      icon: 'success',
      showConfirmButton: false,
      denyButtonColor: '#2196F3',
      denyButtonText: 'Done'
    })
  }
  return { confirmAlert, message }
}
