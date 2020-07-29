import {
    AxiosAdapter,
    AxiosInstance,
    ResponseType,
    AxiosResponse,
} from 'axios';
import axios from 'axios';
import { UserRolePayload } from '../components/User/interfaces';

class API {
    private axios: AxiosInstance;
    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }
    public async fetchSegments(): Promise<any> {
        try {
            const response = await this.axios.get('/segment');
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async addSegment(name: string): Promise<any> {
        try {
            const response = await this.axios.post('/segment', {
                name,
            });

            if (response.status === 201) {
                return response.data.segment;
            }
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteSegment(id: number, name: string): Promise<any> {
        try {
            const response = await axios.delete('/segment', {
                data: {
                    id,
                    name,
                },
            });
            return response.data;
        } catch (error) {
            return error;
        }
    }

    public async renameSegment(id: number, name: string): Promise<any> {
        try {
            const response = await axios.patch(`/segment/${id}`, {
                name,
            });

            return response.data;
        } catch (error) {
            return error;
        }
    }

    public async addSection(
        name: string,
        description: string,
        segment: number,
    ): Promise<any> {
        try {
            const response = await axios.post('/section', {
                name,
                description,
                segment,
            });

            return response;
        } catch (error) {
            return error;
        }
    }

    public async getUsers(): Promise<any> {
        try {
            const response = await axios.get('/admin/users');
            return response.data.users;
        } catch (error) {
            console.error(error);
        }
    }

    public async banUser(
        id: number,
    ): Promise<
        AxiosResponse<{
            message: string;
            user: { id: number; username: string };
        }>
    > {
        try {
            const response = await axios.post('/admin/user/ban', {
                id,
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    public async changeRole(
        id: number,
        username: string,
        role: string,
    ): Promise<AxiosResponse<{ message: string; user: UserRolePayload }>> {
        try {
            const actionType = role === 'USER' ? 'promote' : 'downgrade';
            const response = await axios.post(`/admin/user/${actionType}`, {
                id,
                username,
                role,
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new API(axios);
