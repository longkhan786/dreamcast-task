    <script setup lang="ts">
    // ----------------- Imports ----------------------------
    import { watch, PropType, ref } from 'vue';
    import { useUserService } from '@/composables';

    // ----------------- Props Definition -------------------
    const props = defineProps({
        isDialogOpen: {
            type: Boolean as PropType<boolean>,
            required: true
        }
    })

    const emits = defineEmits(['close'])
    // ----------------- Constants & Reactive Variables -----
    const isDialogVisible = ref(false)
    const imageUrl = ref('')
    const roles = ref([])
    const formData = ref({
        role: null,
        profile: null,
        name: '',
        email: '',
        phone: undefined,
        desciption: ''

    })

    const refAccountForm = ref()

    const defualtUrl = 'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg'
    const { fetchFormInitialData, saveUser } = useUserService()

    // ----------------- Watchers ---------------------------
    watch(() => props.isDialogOpen, (newVal) => {
        if (newVal) {
            isDialogVisible.value = newVal
            formInintialData()
        }
    });

    // methods
    const closeDialog = () => {
        isDialogVisible.value = false
        emits('close', false)
    }

    const onFileChange = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            formData.value.profile = file;
        }
    }

    const formInintialData = () => {
        fetchFormInitialData()
            .then((response) => {
                roles.value = response.roles
            })
    }

    const emailValidator = (value: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailPattern.test(value) || 'Invalid email address'
    }

    const indianMobileNumberValidator = (value: string) => {
        const mobilePattern = /^[6-9]\d{9}$/
        return mobilePattern.test(value) || 'Invalid Indian mobile number'
    }

    const saveUserData = () => {
        saveUser(formData.value)
            .then((response) => {
                closeDialog()
            })
    }

    // ----------------- Initial Code Execution -------------

</script>

    <template>
        <div class="text-center pa-4">
            <v-dialog v-model="isDialogVisible" width="auto">
                <VForm ref="refAccountForm" @submit.prevent="refAccountForm.validate().then(function (response) {
                    response.valid ? saveUserData($event)
                        : ''
                })">
                    <v-card max-width="400" min-width="800">
                        <div class="pa-3 grid grid-cols-4 gap-4">
                            <div>
                                <v-img :width="100" aspect-ratio="16/9" cover
                                    :src="imageUrl || defualtUrl"></v-img>
                                <v-file-input label="File input" @change="onFileChange"></v-file-input>
                            </div>
                            <div>
                                <v-text-field v-model="formData.name" label="User name" />
                            </div>
                            <div>
                                <v-text-field v-model="formData.email" :rules="[emailValidator]" label="email" />
                            </div>
                            <div>
                                <v-text-field v-model="formData.phone" :rules="[indianMobileNumberValidator]" label="phone" />
                            </div>
                            <div>
                                <v-textarea v-model="formData.desciption" label="Desciption"></v-textarea>
                            </div>
                            <div>
                                <v-autocomplete v-model="formData.role" label="Role" :items="roles"></v-autocomplete>
                            </div>
                        </div>
                        <template v-slot:actions>
                            <v-btn class="ms-auto" text="Cancel" @click="closeDialog"></v-btn>
                            <v-btn type="submit">Submit</v-btn>
                        </template>
                    </v-card>
                </VForm>
            </v-dialog>
        </div>
    </template>

