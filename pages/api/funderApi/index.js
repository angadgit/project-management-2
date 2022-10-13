// import connectMongo from '../../../database/conn'
// import { getUsers, postUser, putUser, deleteUser } from '../../../database/controller';

// export default async function handler(req, res) {
//     connectMongo().catch(() => res.status(405).json({ error: "Error in the Connection" }))

//     // type of request
//     const { method } = req

//     switch (method) {
//         case 'GET':
//             getUsers(req, res)
//             break;
//         case 'POST':
//             postUser(req, res)
//             break;
//         case 'PUT':
//             putUser(req, res)
//             break;
//         case 'DELETE':
//             deleteUser(req, res)
//             break;
//         default:
//             res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//             res.status(405).end(`Method ${method} Not Allowd`)
//             break;
//     }
// }


import connectDb from "../../../middleware/mongoose";
import funderModel from "../../../model/funderSchema"

const handler = async (req, res) => {
  if (req.method == 'POST') {
    // console.log(req.body)
    let b = new funderModel(req.body);
    await b.save()
    res.status(200).json({ success: "Success" })
  }
  else if (req.method == 'GET') {
    // let funder = await Funder.find()
    res.status(200).json(await funderModel.find());
  } else {
    res.status(400).json({ error: "This method is not allowed" })
  }

}

export default connectDb(handler)
