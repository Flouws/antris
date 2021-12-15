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
                        <select class="form-select" id="makeAppointmentModalRSSelect" disabled>
                        </select>
                    </div>

                    <div class="form-group mb-2">
                        <label>Poliklinik</label>
                        <select class="form-select" required id="makeAppointmentModalPolySelect">
                            <option selected disabled>Pilih poliklinik</option>
                        </select>
                        <div class="invalid-feedback">Mohon pilih poliklinik yang tersedia</div>
                    </div>

                    <div class="form-group mb-2">
                        <label>Waktu Tersedia</label>
                        <select class="form-select" required id="makeAppointmentModalTimeSelect">
                            <option value="" selected disabled>Pilih Waktu</option>
                        </select>
                        <div class="invalid-feedback" id="makeAppointmentModalTimeInvalid">Mohon pilih waktu yang tersedia</div>
                    </div>

                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Buat Appointment</button> // TODO: Konek ke backend
            </div>
        </div>
    </div>
</div>
`;

const editHospitalModal = ({editHospitalModalNameVal, editHospitalModalAddressVal, editHospitalModalPhoneVal}) => `
<div class="modal fade" id="editHospitalModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Profile</h5>
                <img src="./images/close-24.png" data-dismiss="modal" class="pointer" alt="close" />
            </div>
            <div class="modal-body">

                <div class="form-group row">
                    <label for="editHospitalModalName" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control-plaintext px-1" id="editHospitalModalName" value="${editHospitalModalNameVal}">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="editHospitalModalAddress" class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control-plaintext px-1" id="editHospitalModalAddress" value="${editHospitalModalAddressVal}"> <!-- TODO: Buat terpisah. addr, city, zip -->
                    </div>
                </div>

                <div class="form-group row">
                    <label for="editHospitalModalPhone" class="col-sm-2 col-form-label">Phone</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control-plaintext px-1" id="editHospitalModalPhone" value="${editHospitalModalPhoneVal}">
                    </div>
                </div>

                <div class="form-group mt-2">
                    <label for="editHospitalModalImage" class="form-label">Profile Image</label>
                    <input class="form-control" type="file" id="editHospitalModalImage">
                </div>

                <div class="form-group mt-3">
                    <label for="editHospitalModalDesc">Description</label>
                    <textarea class="form-control mt-2" id="editHospitalModalDesc" rows="3" placeholder="Enter description"></textarea>
                    <div class="form-text">
                        Kosongkan jika deskripsi tetap sama
                    </div>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="editHospitalModalSave" data-dismiss="modal">Save Changes</button>
            </div>
        </div>
    </div>
</div>
`;

const addPolyModal = () => `
    <div class="modal fade" id="addPolyModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add polyclinic</h5>
                    <img src="./images/close-24.png" data-dismiss="modal" class="pointer" alt="close" />
                </div>
                <div class="modal-body">

    

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="addPolyModalSave" data-dismiss="modal">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
`;


export {
  makeAppointmentModal,
  editHospitalModal,
  addPolyModal,
};
