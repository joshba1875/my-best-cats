export default async function fetcher(operation: string, url: string, body?: string): Promise<Response> {
    const init = {
        headers:{
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY ?? '', 
        },
        method: operation,
        body: body
      };

       return fetch(url, init);
}