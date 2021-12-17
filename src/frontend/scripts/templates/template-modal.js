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

                    <div class="form-group row mb-2">
                        <label class="col-sm-4 col-form-label">Rumah Sakit</label>
                        <div class="col-sm-8">
                            <select class="form-select" id="makeAppointmentModalRSSelect" disabled></select>
                        </div>
                    </div>

                    <div class="form-group row mb-2">
                        <label class="col-sm-4 col-form-label">Poliklinik</label>
                        <div class="col-sm-8">
                            <select class="form-select" required id="makeAppointmentModalPolySelect">
                                <option selected disabled>Pilih poliklinik</option>
                            </select>
                            <div class="invalid-feedback">Mohon pilih poliklinik yang tersedia</div>
                        </div>
                    </div>

                    <div class="form-group row mb-2">
                        <label class="col-sm-4 col-form-label">Waktu Tersedia</label>
                        <div class="col-sm-8">
                            <select class="form-select" required id="makeAppointmentModalTimeSelect">
                                <option selected disabled>Pilih Waktu</option>
                            </select>
                            <div class="invalid-feedback" id="makeAppointmentModalTimeInvalid">Mohon pilih waktu yang tersedia</div>
                        </div>
                    </div>

                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="makeAppointmentModalSave" data-dismiss="modal">Buat Appointment</button>
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

            <form enctype="multipart/form-data">
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
            </form> 


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
                    <h5 class="modal-title">Add Polyclinic</h5>
                    <img src="./images/close-24.png" data-dismiss="modal" class="pointer" alt="close" />
                </div>
                <div class="modal-body">


                    <div class="form-group row">
                        <label for="addPolyModalName" class="col-sm-2 col-form-label">Polyclinic</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="addPolyModalName">
                        </div>
                    </div>

                    <div class="form-group row mt-3">
                        <label for="addPolyModalDoctor" class="col-sm-2 col-form-label">Doctor</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="addPolyModalDoctor">
                        </div>
                    </div>

                    <div class="form-group row mt-3">
                        <label for="addPolyModalCapacity" class="col-sm-2 col-form-label">Capacity</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="addPolyModalCapacity">
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <label for="addPolyModalDescription">Description</label>
                        <textarea class="form-control mt-2" id="addPolyModalDescription" rows="3" placeholder="Enter description"></textarea>
                    </div>

                    <div class="form-group mt-2">
                        <label for="addPolyModalImage" class="form-label">Polyclinic Image</label>
                        <input class="form-control" type="file" id="addPolyModalImage">
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="addPolyModalSave" data-dismiss="modal">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
`;

const addAppointmentModal = () => `
    <div class="modal fade" id="addAppointmentModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Appointment Schedule</h5>
                    <img src="./images/close-24.png" data-dismiss="modal" class="pointer" alt="close" />
                </div>
                <div class="modal-body">


                    <form>
                        <div class="form-group">
                            <label>Day</label>
                            <select class="form-control" id="addAppointmentModalSelect">
                                <option value="1">Senin</option>
                                <option value="2">Selasa</option>
                                <option value="3">Rabu</option>
                                <option value="4">Kamis</option>
                                <option value="5">Jumat</option>
                                <option value="6">Sabtu</option>
                                <option value="7">Minggu</option>
                            </select>
                        </div>
                        <div class="form-group mt-2">
                            <div class="row">
                                <div class="col">
                                    <label>Start Time</label>
                                    <input type="text" class="form-control" placeholder="09:30:00" id="addAppointmentModalStart"> <!-- TODO: buat pemisah jam menit detik -->
                                </div>
                                <div class="col">
                                    <label>End Time</label>
                                    <input type="text" class="form-control" placeholder="10:40:00" id="addAppointmentModalEnd">
                                </div>
                            </div>
                        </div>
                    </form>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="addAppointmentModalSave" data-dismiss="modal">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
`;


export {
  makeAppointmentModal,
  editHospitalModal,
  addPolyModal,
  addAppointmentModal,
};
