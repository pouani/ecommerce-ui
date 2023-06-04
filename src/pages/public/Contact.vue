<template lang="">
    <div class="contact">
        <!-- <h2>Veillez nous laissez un message</h2> -->
        <div class="d-flex justify-content-center">
            <form action="" class="bg-white px-4 py-3 rounded" style="max-width: 25rem; width: 100%;">
                <div class="mb-3 w-100">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="name@example.com">
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Votre message</label>
                    <textarea class="form-control" id="message" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="adresse" class="form-label">Adresse</label>
                    <input type="text" class="form-control" id="adresse" placeholder="Kotto Bonamoussadi">
                </div>
                <button class="btn btn-primary">Je laisse mon message</button>
            </form>
        </div>
    </div>
</template>
<script setup>
</script>