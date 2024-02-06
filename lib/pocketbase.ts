import PocketBase from "pocketbase";

export interface ClientError {
    url: string;
    status: number;
    response: {
        code: number;
        message: string;
        data: {
            [x: string]: {
                code: string;
                message: string;
            },
        }
    },
    isAbort: boolean;
    originalError: any;
    name: string;
}


const pb = new PocketBase(process.env.NEXT_PUBLIC_AUTH_URL);

// NextJS uses React strict mode, every component is rendered twice.
// The auto cancellation feature can result in request failure in NextJS even if the request was processed fine.
if (process.env.NODE_ENV === "development") pb.autoCancellation(false);

export default pb;