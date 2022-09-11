class ExtendableError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

class forbiddenAccess extends ExtendableError {
}

interface TopNews {
    articles:[]
    id?:string
    name:string
    status?:string
    author?: string
    title?: string
    description?: string
    url?:string
    urlToImage?:string
    publishedAt?:string
    content?:string
}


class ServiceAPI {
    getHeaders(contentType: string) {
        const headers = new Headers();

        if (contentType) {
            headers.set("Content-Type", contentType);
        }

        return headers;
    }

    /**
     *
     * @returns This function returns the headline news search by country selected
     * @throws {forbiddenAccess} Will throw an error if  the server return a error
     *
*/
    async getArticles(country: string): Promise<TopNews> {
        const res = await fetch(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=176ab900d9ce4bd68b874e4ce3a509f8`, {
            method: "GET",
            headers: this.getHeaders('application/json')

        });

        if(res.status == 500) {
            throw new forbiddenAccess('Desculpe, ocorreru um erro  em nosso servidor...');
        }
        console.log(res);
        const content_article= res.json();
        console.log(content_article);
        return content_article;
    }

}

export const serviceAPI = new ServiceAPI();
export { TopNews, forbiddenAccess };

