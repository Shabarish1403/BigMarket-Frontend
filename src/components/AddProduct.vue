<template>
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="form-floating mb-3">
            <input type="text" class="form-control" placeholder="name">
            <label for="floatingInput">Name</label>
        </div>
        <div class="form-floating">
            <input type="datetime-local" class="form-control" placeholder="expiry">
            <label for="floatingPassword">Expiry</label>
        </div>
        <div class="form-floating">
            <input type="float" class="form-control" placeholder="Price">
            <label for="floatingPassword">Price</label>
        </div>
        <div class="form-floating">
            <input type="text" class="form-control" placeholder="unit">
            <label for="floatingPassword">Unit</label>
        </div>
        <div class="form-floating">
            <input type="integer" class="form-control" placeholder="availability">
            <label for="floatingPassword">availability</label>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AddProduct',
};
</script>