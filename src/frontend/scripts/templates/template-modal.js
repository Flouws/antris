/* eslint-disable max-len */
const makeAppointmentModal = `
<div class="modal fade" id="makeAppointmentModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Buat Appointment</h5>
                <img src="./images/close-24.png" data-dismiss="modal" class="pointer" alt="close" />
            </div>
            <div class="modal-body">

                <form class="was-validated">

                    <div class="form-group mb-2">
                        <label>Rumah Sakit</label>
                        <select class="form-select" id="makeAppointmentRSSelect">
                        </select>
                    </div>

                    <div class="form-group mb-2">
                        <label>Poliklinik</label>
                        <select class="form-select" required id="makeAppointmentPolySelect">
                            <option value="" selected disabled>Pilih poliklinik</option>
                        </select>
                        <div class="invalid-feedback">Mohon pilih poliklinik yang tersedia</div>
                    </div>

                    <div class="form-group mb-2">
                        <label>Waktu Tersedia</label>
                        <select class="form-select" required id="makeAppointmentTimeSelect">
                            <option value="" selected disabled>Pilih Waktu</option>
                        </select>
                        <div class="invalid-feedback">Mohon pilih waktu yang tersedia</div>
                    </div>

                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Buat Appointment</button>
            </div>
        </div>
    </div>
</div>
`;


export {
  makeAppointmentModal,
};
