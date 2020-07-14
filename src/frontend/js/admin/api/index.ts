import { AxiosAdapter, AxiosInstance, ResponseType } from 'axios';
import axios from 'axios';

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
}

export default new API(axios);
