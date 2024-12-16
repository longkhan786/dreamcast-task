import api from "./useApi"; // Adjust path based on file structure
import { ref } from "vue";

export const useUserService = () => {
    const users = ref({ data: [], count: 0 });
    const loading = ref(false);

    const fetchUsers = async (params: Record<string, any>) => {
        loading.value = true;
        try {
            const { data } = await api.get("/users/list", { params });
            users.value.data = data.data;
            users.value.count = data.pagination.total;
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            loading.value = false;
        }
    };

    const fetchFormInitialData = async () => {
        loading.value = true;
        try {
            const { data } = await api.get("/users/formInitialData");
            return data.data;
        } catch (error) {
            console.error("Error fetching form initial data:", error);
        } finally {
            loading.value = false;
        }
    }

    const saveUser = async (userData) => {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('role', userData.role);
        formData.append('profile', userData.profile);
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('phone', userData.phone);
        formData.append('description', userData.description);

        loading.value = true;
        try {
            await api.post('/users/save', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            console.error("Error saving user:", error.response?.data || error.message || error);
        } finally {
            loading.value = false;
        }
    };



    return { users, loading, fetchUsers, fetchFormInitialData, saveUser };
};
