<script setup lang="ts">
import { useUserService } from '@/composables';
import { ref } from 'vue'
import UserFormModel from './UserFormModel.vue';

const headers = ref([
    { title: 'Profile', sortable: false, key: 'profile'},
    { title: 'Name', sortable: true, key: 'name'},
    { title: 'Email',  sortable: true, key: 'email'},
    { title: 'Phone No.',  sortable: true, key: 'phone'},
    { title: 'Description', sortable: false, key: 'description'},
    { title: 'Role',  sortable: true, key: 'role'},
    { title: 'Action', key: 'action', sortable: false},
])

const itemsPerPage = ref(5)
const search = ref('')
const { loading, users, fetchUsers } = useUserService()
const loadItems = async ({ page, itemsPerPage, sortBy }) => {
    fetchUsers({ page, itemsPerPage, sortBy })
}

const openDialog = ref(false)
const closeDialog = () => {
    openDialog.value = false
    loadItems
}

const updateUser = (userId) => {
    
}
</script>
<template>
    <div>
        <div style="text-align: end;">
            <VBtn color="primary" @click="openDialog = true">Add User</VBtn>
        </div>
        <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="users.data"
            :items-length="users.count" :loading="loading" :search="search" item-value="name"
            @update:options="loadItems">
            <template #[`item.action`]="{item}">
                <div class="d-flex gap-2">
                    <VBtn size="38" color="primary"  @click="updateUser(item.id)"
                   >
                        edit
                    </VBtn>
                    <VBtn size="38" color="primary"
                   >
                    delete
                    </VBtn>
                </div>
        </template>
            <template #item.profile="{ item }">
                <img v-if="item.profile" :src="item.profile" alt="Profile Photo" width="50" height="50">
            </template>
             
        </v-data-table-server>
    </div>
    <UserFormModel 
    :is-dialog-open="openDialog"
    @close="closeDialog"
    />
</template>
