import { createAddPosts, getAddPosts, deletePost, updatePost, createGood, getGoods } from '../../../lib/backend/database';
import { NextApiRequest, NextApiResponse } from 'next';

// By Danny, Nicole @Flaminglets
// It represents the core API for the the missing poster pages.
// Requires a request or response when fetching this API.
// There are four main request methods: POST, DELETE, PUT, and GET.
// Contains an request interface that specifies typing for different properties


interface PostRequestBody {
    name: string,
    witch: string,
    material: string,
    length: string,
    width: string,
    weight: string,
    description: string,
    location: string,
    images: any,
    price: string,
    user: any,
}

interface PostRequestBody extends NextApiRequest {
    body: PostRequestBody;
}

// An async handler function that process a request and a response.
// @param req the request you want to make that will interact with the database
// @param res the response you want to make to get a status on the performed action
// @return None
export default async function handler(req: PostRequestBody, res: NextApiResponse) {
    try {
        if (req.method == 'POST') {
            const data = req.body;
            const { name, witch, material, length, width, weight, description, location, images, price, user } = data; // destructuring

            await createGood(name, witch, material, length, width, weight, description, location, images, price, user);

            res.status(200).json(
                {
                    success: true
                }
            );
            return;
        }

        // deletePost - pass the poster id to delete the poster.
        else if (req.method == 'DELETE') {
            // const data = req.body;
            // const postID = data;
            //
            // await deletePost(postID);
            // res.status(200).json(
            //     {
            //         success: true
            //     }
            // );
            // return;
        }

        // updatePost - pass the poster id and new data to modify an exisitng post's information.
        else if (req.method == "PUT") {
            // const data = req.body;
            // const { postID, newData } = data;
            //
            // await updatePost(postID, newData);
            // res.status(200).json(
            //     {
            //         success: true
            //     }
            // );
            // return;
        }

        // getPost - gets all the existing post from the database
        else if (req.method == 'GET') {
            const data = await getGoods();
            res.status(200).json(data);
            return;
        }

    } catch {
        res.status(404).send({ error: "Error with post" })
    }
}
