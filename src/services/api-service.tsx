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
    id?:string
    name:string
    author?: string
    title?: string
    description?: string
    url?:string
    urlToImage?:string
    publishedAt?:string
    content?:string
}

interface Articles {
    articles: TopNews,
    status?:string
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
    async getArticles(country: string): Promise<TopNews[]> {
        const res = await fetch(`http://newsapi.org/v2/top-headlines?country=br&apiKey=176ab900d9ce4bd68b874e4ce3a509f8`, {
            method: "GET",

        });

        if(res.status == 500) {
            throw new forbiddenAccess('Desculpe, ocorreru um erro  em nosso servidor...');
        }
        console.log(res);

        const response = await res.json();

        return response.articles.map((item: TopNews) => {
            return {
                id: item.id,
                author: item.author,
                content: item.content,
                description: item.description,
                name: item.name,
                urlToImage: item.urlToImage
            };
        });
    }

}

export const serviceAPI = new ServiceAPI();
export { TopNews, forbiddenAccess, Articles };

