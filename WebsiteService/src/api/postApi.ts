/* eslint-disable class-methods-use-this */

class Posts {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'https://jsonplaceholder.typicode.com/posts';
    }

    checkResponse = (res: Response) => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Something went wrong');
    };

    customFetch = async (slug: string, body: BodyInit, method: string, headers: HeadersInit) => {
        const bodyDisplay: BodyInit = body;

        const headerToSend: HeadersInit = headers || {};

        const fetchObject: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headerToSend,
            },
            ...(method !== 'GET' ? { body: bodyDisplay } : {}),
        };

        const res = await fetch(`${this.baseUrl}/${slug}`, fetchObject);
        return this.checkResponse(res);
    };

    getPost = async () => this.customFetch('', {} as BodyInit, 'GET', {
    });
}

const postsApi = new Posts();

export default postsApi;
