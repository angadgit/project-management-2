
/** Controller */
import Recepit from '../model/recepitSchema'

// get : http://localhost:3000/api/recepitApi
export async function getRecepits(req, res) {
  try {
    const recepit = await Recepit.find({})

    if (!recepit) return res.status(404).json({ error: "Data not Found" })
    res.status(200).json(recepit)
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" })
  }
}

// get : http://localhost:3000/api/recepitApi/1
export async function getRecepit(req, res) {
  try {
    const recepitId = req.query;
    let id = recepitId.formId
    console.log("controal",req.query)
    if (id) {
      const recepit = await Recepit.findById(id);
      res.status(200).json(recepit)
    }
    res.status(404).json({ error: "Recepit not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the Recepit...!" })
  }
}

// post : http://localhost:3000/api/recepitApi
export async function postRecepit(req, res) {
  try {
    const formData = req.body;
    if (!formData) return res.status(404).json({ error: "Recepit Data Not Provided...!" });
    Recepit.create(formData, function (err, data) {
      return res.status(200).json(data)
    })
  } catch (error) {
    return res.status(404).json({ error })
  }
}

// put : http://localhost:3000/api/recepitApi/1
export async function putRecepit(req, res) {
  try {
    const userId = req.query;
    let id = userId.formId
    const formData = req.body;

    if (id && formData) {
      const user = await Recepit.findByIdAndUpdate(id, formData);
      res.status(200).json(user)
    }
    res.status(404).json({ error: "Recepit Not Selected...!" })
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" })
  }
}

// delete : http://localhost:3000/api/recepitApi/1
export async function deleteRecepit(req, res) {
  try {
    const userId = req.query;
    let id = userId.formId
    console.log(id)

    if (id) {
      const user = await Recepit.findByIdAndDelete(id)
      return res.status(200).json(user)
    }

    res.status(404).json({ error: "Recepit Not Selected...!" })

  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the User...!" })
  }
}